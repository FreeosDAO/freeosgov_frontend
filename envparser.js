const DotEnv = require('dotenv')
const parsedEnv = DotEnv.config().parsed
module.exports = function (ctx) {

  parsedEnv['AIRCLAIM_CONTRACT'] = ctx.dev ? "freeosclaimb" : "freeosclaimb",
  parsedEnv['AIRCLAIM_CONFIGURATION_CONTRACT'] = ctx.dev ? "freeoscfgb" : "freeoscfgb",
  parsedEnv['FREEOSTOKENS_CONTRACT'] = ctx.dev ? "freeostokenb": "freeostokenb"
  parsedEnv['TOKEN_CURRENCY_NAME'] = ctx.dev ? "POINT" : "POINT"
  parsedEnv['TIMED_FETCH_DELAY'] = ctx.dev ? 10000000 : 10000
  parsedEnv['VUE_ROUTER_MODE'] = ctx.dev ? "hash" : "history"

  return parsedEnv
}
