const DotEnv = require('dotenv')
const parsedEnv = DotEnv.config().parsed
module.exports = function (ctx) {

  parsedEnv['AIRCLAIM_CONTRACT'] = ctx.dev ? "freeos4" : "freeosa",
  parsedEnv['AIRCLAIM_CONFIGURATION_CONTRACT'] = ctx.dev ? "freeoscfg4" : "freeoscfga",
  parsedEnv['FREEOSTOKENS_CONTRACT'] = ctx.dev ? "freeostoken4": "freeostokena"
  parsedEnv['TIMED_FETCH_DELAY'] = ctx.dev ? 10000000 : 10000
  parsedEnv['VUE_ROUTER_MODE'] = ctx.dev ? null : "history"

  return parsedEnv
}
