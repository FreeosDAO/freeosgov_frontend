const { JsonRpc } = require('eosjs')

const FALLBACK_RPC_ENDPOINTS = [
  'https://api.protonnz.com',
  'https://proton.cryptolions.io',
  'https://mainnet.brotonbp.com'
]

const DEFAULT_RPC_CACHE_TTL_MS = getPositiveInt(process.env.RPC_TABLE_CACHE_TTL_MS, 4000)
const DEFAULT_RPC_BACKOFF_BASE_MS = getPositiveInt(process.env.RPC_BACKOFF_BASE_MS, 1000)
const DEFAULT_RPC_BACKOFF_MAX_MS = getPositiveInt(process.env.RPC_BACKOFF_MAX_MS, 30000)
const DEFAULT_RPC_RETRY_ROUNDS = getPositiveInt(process.env.RPC_RETRY_ROUNDS, 2)
const DEFAULT_RPC_CACHE_LIMIT = getPositiveInt(process.env.RPC_CACHE_LIMIT, 250)

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function normalizeEndpoint (endpoint) {
  if (!endpoint) return null

  let normalized = String(endpoint)
    .trim()
    .replace(/^['"]+|['"]+$/g, '')

  if (!normalized) return null

  if (!/^https?:\/\//i.test(normalized)) {
    normalized = 'https://' + normalized
  }

  return normalized.replace(/\/+$/, '')
}

function buildNetworkEndpoint () {
  const host = (process.env.NETWORK_HOST || '').trim()
  if (!host) return null

  if (/^https?:\/\//i.test(host)) {
    return normalizeEndpoint(host)
  }

  const protocol = (process.env.NETWORK_PROTOCOL || 'https').trim() || 'https'
  const port = (process.env.NETWORK_PORT || '').trim()

  if (!port) return normalizeEndpoint(protocol + '://' + host)
  if ((protocol === 'https' && port === '443') || (protocol === 'http' && port === '80')) {
    return normalizeEndpoint(protocol + '://' + host)
  }

  return normalizeEndpoint(protocol + '://' + host + ':' + port)
}

export function getRpcEndpoints () {
  const endpoints = []
  const seen = new Set()

  const addEndpoint = endpoint => {
    const normalized = normalizeEndpoint(endpoint)
    if (!normalized || seen.has(normalized)) return
    seen.add(normalized)
    endpoints.push(normalized)
  }

  const appChainEndpoints = (process.env.APP_CHAIN_ENDPOINT || '')
    .split(',')
    .map(endpoint => endpoint.trim())
    .filter(Boolean)
  appChainEndpoints.forEach(addEndpoint)

  addEndpoint(buildNetworkEndpoint())

  if (endpoints.length === 0) {
    FALLBACK_RPC_ENDPOINTS.forEach(addEndpoint)
  }

  return endpoints
}

function getPositiveInt (value, fallback) {
  const parsed = Number.parseInt(value, 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

function toLowerCaseObjectKeys (source) {
  const output = {}
  Object.keys(source || {}).forEach(key => {
    output[String(key).toLowerCase()] = source[key]
  })
  return output
}

function readHeaderValue (headers, key) {
  if (!headers) return null
  const normalizedKey = String(key).toLowerCase()

  if (typeof headers.get === 'function') {
    return headers.get(key) || headers.get(normalizedKey)
  }

  if (Array.isArray(headers)) {
    const found = headers.find(([headerName]) => String(headerName).toLowerCase() === normalizedKey)
    return found ? found[1] : null
  }

  const lowered = toLowerCaseObjectKeys(headers)
  return lowered[normalizedKey] || null
}

function getErrorStatusCode (error) {
  const candidates = [
    error && error.status,
    error && error.statusCode,
    error && error.code,
    error && error.response && error.response.status,
    error && error.json && error.json.code
  ]

  for (const candidate of candidates) {
    const parsed = Number.parseInt(candidate, 10)
    if (Number.isFinite(parsed)) return parsed
  }

  return null
}

function getErrorMessage (error) {
  const detailMessages = (error && error.details && Array.isArray(error.details))
    ? error.details.map(detail => detail.message).filter(Boolean).join(' ')
    : ''
  const jsonMessage = error && error.json && error.json.error && error.json.error.what
  return [
    error && error.message,
    detailMessages,
    jsonMessage
  ].filter(Boolean).join(' ')
}

export function getRetryAfterDelayMs (error) {
  const responseHeaders = error && error.response && error.response.headers
  const errorHeaders = error && error.headers
  const retryAfterRaw = readHeaderValue(responseHeaders, 'retry-after') || readHeaderValue(errorHeaders, 'retry-after')
  if (!retryAfterRaw) return null

  const retryAfterSeconds = Number.parseInt(retryAfterRaw, 10)
  if (Number.isFinite(retryAfterSeconds) && retryAfterSeconds >= 0) {
    return retryAfterSeconds * 1000
  }

  const retryAfterDate = new Date(retryAfterRaw)
  if (Number.isFinite(retryAfterDate.getTime())) {
    return Math.max(0, retryAfterDate.getTime() - Date.now())
  }

  return null
}

export function isRateLimitError (error) {
  const status = getErrorStatusCode(error)
  if (status === 429) return true
  return /too many requests|rate limit|429/i.test(getErrorMessage(error))
}

function isNetworkLikeError (error) {
  return /failed to fetch|networkerror|network request failed|load failed|cors/i.test(getErrorMessage(error))
}

function isRetriableError (error) {
  const status = getErrorStatusCode(error)
  return isRateLimitError(error) ||
    isNetworkLikeError(error) ||
    status === 408 ||
    status === 502 ||
    status === 503 ||
    status === 504
}

function buildCacheKey (methodName, args) {
  try {
    return methodName + '::' + JSON.stringify(args || [])
  } catch (error) {
    return null
  }
}

class RpcFailoverClient {
  constructor (options = {}) {
    const endpoints = (options.endpoints && options.endpoints.length)
      ? options.endpoints
      : getRpcEndpoints()

    this.clients = endpoints.map(endpoint => ({
      endpoint,
      rpc: new JsonRpc(endpoint, { fetch }),
      rateLimitedUntil: 0
    }))

    this.cacheTTLms = getPositiveInt(options.cacheTTLms, DEFAULT_RPC_CACHE_TTL_MS)
    this.cacheLimit = getPositiveInt(options.cacheLimit, DEFAULT_RPC_CACHE_LIMIT)
    this.backoffBaseMs = getPositiveInt(options.backoffBaseMs, DEFAULT_RPC_BACKOFF_BASE_MS)
    this.backoffMaxMs = getPositiveInt(options.backoffMaxMs, DEFAULT_RPC_BACKOFF_MAX_MS)
    this.retryRounds = getPositiveInt(options.retryRounds, DEFAULT_RPC_RETRY_ROUNDS)

    this.cache = new Map()
    this.inflight = new Map()
    this.currentIndex = 0
  }

  async get_table_rows (config, options = {}) {
    const forceRefresh = options.forceRefresh === true
    const cacheTTLms = options.cacheTTLms === 0
      ? 0
      : getPositiveInt(options.cacheTTLms, this.cacheTTLms)
    const cacheKey = buildCacheKey('get_table_rows', [config])

    if (!forceRefresh && cacheTTLms > 0 && cacheKey) {
      const cached = this.cache.get(cacheKey)
      if (cached && cached.expiresAt > Date.now()) return cached.value
      this.cache.delete(cacheKey)
    }

    if (!forceRefresh && cacheKey && this.inflight.has(cacheKey)) {
      return this.inflight.get(cacheKey)
    }

    const requestPromise = this.call('get_table_rows', config)
      .then(result => {
        if (!forceRefresh && cacheTTLms > 0 && cacheKey) {
          this.cache.set(cacheKey, {
            value: result,
            expiresAt: Date.now() + cacheTTLms
          })
          this.pruneCache()
        }
        return result
      })
      .finally(() => {
        if (cacheKey) this.inflight.delete(cacheKey)
      })

    if (cacheKey) this.inflight.set(cacheKey, requestPromise)
    return requestPromise
  }

  async get_account (name) {
    return this.call('get_account', name)
  }

  async call (methodName, ...args) {
    if (!this.clients.length) {
      throw new Error('No RPC endpoints configured')
    }

    const maxAttempts = Math.max(1, this.clients.length * (this.retryRounds + 1))
    let attempt = 0
    let lastError = null

    while (attempt < maxAttempts) {
      const now = Date.now()
      const candidateIndex = this.getNextAvailableIndex(now)

      if (candidateIndex === -1) {
        const cooldownMs = this.getShortestCooldown(now)
        if (cooldownMs > 0) await sleep(cooldownMs)
        continue
      }

      const client = this.clients[candidateIndex]

      try {
        const response = await client.rpc[methodName](...args)
        client.rateLimitedUntil = 0
        this.currentIndex = candidateIndex
        return response
      } catch (error) {
        lastError = error
        attempt += 1

        if (!isRetriableError(error) || attempt >= maxAttempts) {
          throw error
        }

        const retryAfterDelay = getRetryAfterDelayMs(error)
        const exponentialBackoff = Math.min(this.backoffBaseMs * Math.pow(2, Math.max(0, attempt - 1)), this.backoffMaxMs)
        const jitter = Math.floor(Math.random() * 250)
        const delay = Math.max(retryAfterDelay || 0, exponentialBackoff + jitter)

        if (isRateLimitError(error)) {
          client.rateLimitedUntil = Date.now() + delay
        }

        this.currentIndex = (candidateIndex + 1) % this.clients.length
        if (delay > 0) await sleep(delay)
      }
    }

    throw lastError || new Error('RPC call failed after retries')
  }

  getNextAvailableIndex (timestamp) {
    for (let offset = 0; offset < this.clients.length; offset += 1) {
      const index = (this.currentIndex + offset) % this.clients.length
      const client = this.clients[index]
      if (!client.rateLimitedUntil || client.rateLimitedUntil <= timestamp) {
        return index
      }
    }
    return -1
  }

  getShortestCooldown (timestamp) {
    let minDelay = Number.POSITIVE_INFINITY

    this.clients.forEach(client => {
      if (client.rateLimitedUntil > timestamp) {
        const delay = client.rateLimitedUntil - timestamp
        minDelay = Math.min(minDelay, delay)
      }
    })

    if (!Number.isFinite(minDelay)) {
      return this.backoffBaseMs
    }

    return Math.max(100, minDelay)
  }

  pruneCache () {
    if (this.cache.size <= this.cacheLimit) return

    const now = Date.now()
    for (const [key, entry] of this.cache.entries()) {
      if (!entry || entry.expiresAt <= now) {
        this.cache.delete(key)
      }
      if (this.cache.size <= this.cacheLimit) return
    }

    while (this.cache.size > this.cacheLimit) {
      const firstKey = this.cache.keys().next().value
      this.cache.delete(firstKey)
    }
  }
}

export function createRpcClient (options = {}) {
  return new RpcFailoverClient(options)
}
