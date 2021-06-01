const { JsonRpc } = require('eosjs')
// endpoint
const rpc = new JsonRpc('https://' + process.env.NETWORK_HOST + ':' + process.env.NETWORK_PORT, { fetch })

import { Loading, Notify } from 'quasar'

export function connect (config) {
  return new Promise((resolve, reject) => {
    showLoading()
    rpc.get_table_rows(config)
      .then((response) => {
        resolve(successHandler(response))
      })
      .catch(error => {
        reject(errorHandler(error))
      })
  })
}

// Handle mutilple request in same time
let needLoadingRequestCount = 0

export function showLoading () {
  if (needLoadingRequestCount === 0) {
    Loading.show()
  }
  needLoadingRequestCount++
}

export function successHandler (response) {
  if (needLoadingRequestCount <= 0) return response
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    Loading.hide()
  }
  return response
}

export function errorHandler (error) {
  // stop load count at once
  needLoadingRequestCount = 0
  Loading.hide()

  if (error.message || error.response.data.message) {
    Notify.create({
      message: error.message || error.response.data.message,
      color: 'negative',
      timeout: 3000
    })
  }

  return error
}
