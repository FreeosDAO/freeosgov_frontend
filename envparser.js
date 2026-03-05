const DotEnv = require('dotenv')
const parsedEnv = DotEnv.config().parsed
module.exports = function (ctx) {

  parsedEnv['FREEOSGOV_CONTRACT'] = ctx.dev ? "freeosclaim" : "freeosclaim"
  parsedEnv['FREEOSTOKENS_CONTRACT'] = ctx.dev ? "freeostokens" : "freeostokens"
  parsedEnv['FREEBITOKENS_CONTRACT'] = ctx.dev ? "freebitokens" : "freebitokens"
  parsedEnv['TIMED_FETCH_DELAY'] = parsedEnv['TIMED_FETCH_DELAY'] || (ctx.dev ? 10000 : 10000)
  parsedEnv['TIMED_FETCH_HIDDEN_DELAY'] = parsedEnv['TIMED_FETCH_HIDDEN_DELAY'] || 30000
  parsedEnv['RPC_TABLE_CACHE_TTL_MS'] = parsedEnv['RPC_TABLE_CACHE_TTL_MS'] || 4000
  parsedEnv['VUE_ROUTER_MODE'] = ctx.dev ? "hash" : "history"

  return parsedEnv
}
