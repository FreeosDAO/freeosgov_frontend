const DotEnv = require('dotenv')
const parsedEnv = DotEnv.config().parsed
module.exports = function (ctx) {

  parsedEnv['FREEOSGOV_CONTRACT'] = ctx.dev ? "betaclaim" : "betaclaim"
  parsedEnv['FREEOSTOKENS_CONTRACT'] = ctx.dev ? "betabeta" : "betabeta"
  parsedEnv['FREEBITOKENS_CONTRACT'] = ctx.dev ? "betabeebi" : "betabeebi"
  parsedEnv['TIMED_FETCH_DELAY'] = ctx.dev ? 5000 : 5000
  parsedEnv['VUE_ROUTER_MODE'] = ctx.dev ? "hash" : "history"

  return parsedEnv
}
