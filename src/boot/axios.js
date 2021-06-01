import axios from 'axios'

export const http = axios.create({
  baseURL: process.env.INTEGRATED_SERVICES_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': process.env.INTEGRATED_SERVICES_API_KEY
  }
})

http.interceptors.response.use(response => response.data || {})

export default ({ Vue, store }) => {
  Vue.prototype.$axios = http
  store.$axios = http
}
