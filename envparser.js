const DotEnv = require('dotenv')
const parsedEnv = DotEnv.config().parsed
module.exports = function (ctx) {

  parsedEnv['AIRCLAIM_CONTRACT'] = ctx.dev ? "freeos5" : "freeos5"
  parsedEnv['AIRCLAIM_CONFIGURATION_CONTRACT'] = ctx.dev ? "freeoscfg5" : "freeoscfg5"
  parsedEnv['FREEOSTOKENS_CONTRACT'] = ctx.dev ? "freeostoken5" : "freeostoken5"
  parsedEnv['TOKEN_CURRENCY_NAME'] = ctx.dev ? "POINT" : "POINT"
  parsedEnv['ALTVERIFYACC'] = ctx.dev ? "freeosconfig" : "eosio.proton"
  parsedEnv['TIMED_FETCH_DELAY'] = ctx.dev ? 10000000 : 10000
  parsedEnv['VUE_ROUTER_MODE'] = ctx.dev ? "hash" : "history"  

  return parsedEnv
}
