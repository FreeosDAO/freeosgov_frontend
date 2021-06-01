import { initAccessContext } from 'eos-transit'
import scatter from 'eos-transit-scatter-provider'

export default async ({ Vue, store }) => {
  // Add here other providers like keycat, etc
  const walletProviders = [
    scatter()
  ]
  const accessContext = initAccessContext({
    appName: process.env.APP_NAME,
    network: {
      protocol: process.env.NETWORK_PROTOCOL,
      blockchain: process.env.NETWORK_BLOCKCHAIN,
      host: process.env.NETWORK_HOST,
      port: process.env.NETWORK_PORT,
      chainId: process.env.NETWORK_CHAIN_ID
    },
    walletProviders
  })
  const transit = { accessContext }
  Vue.prototype.$transit = transit
  store.$transit = transit
  // console.log(transit)
  // if (localStorage.walletId) {
  //   store.dispatch('account/connectWallet', localStorage.walletId)
  // }
}
