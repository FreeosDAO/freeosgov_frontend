const DotEnv = require('dotenv')
const parsedEnv = DotEnv.config().parsed
module.exports = function (ctx) {

  parsedEnv['AIRCLAIM_CONTRACT'] = ctx.dev ? "freeosa" : "freeos4",
  parsedEnv['AIRCLAIM_CONFIGURATION_CONTRACT'] = ctx.dev ? "freeoscfga" : "freeoscfg4",
  parsedEnv['FREEOSTOKENS_CONTRACT'] = ctx.dev ? "freeostokena": "freeostoken4"

  return parsedEnv
}
