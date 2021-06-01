import notifyAlert from 'src/services/notify-alert'
// import { RpcError } from 'eosjs'
import { connect } from 'src/utils/smartContractRequest'

import ProtonSDK from '../../utils/proton'

export const actionClaim = async function ({ commit }, accountName) {
  const resp3 = await connect({
    json: true,
    code: process.env.AIRCLAIM_CONTRACT,
    scope: accountName,
    table: 'accounts',
    lower_bound: 'FREEOS',
    limit: 1
  })

  const userPreviousBalance = (resp3.rows[0] && parseFloat(resp3.rows[0].balance)) || 0
  commit('setUserPreviousBalance', userPreviousBalance)
  try {
    const result = await ProtonSDK.sendTransaction({
      actions: [{
        account: process.env.AIRCLAIM_CONTRACT, // the name of the airclaim contract (i'm using freeos333333 as a test account on Kylin)
        name: 'claim', // name of the action to call
        authorization: [{
          actor: global.accountName, // the claim action is called on behalf of the user
          permission: 'active' // name of permission, e.g. this and the line above are the equivalent of  -p yvetecoleman@active
        }],
        data: {
          // Kenneth: only the following parameters required for claim action
          user: global.accountName // account name = yvetecoleman
        }
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30
    })
    if (result.processed.receipt.status === 'executed') {
      notifyAlert('success', result.processed.action_traces[0].console) // Kenneth: Notify message in green
      const resp3After = connect({
        json: true,
        code: process.env.AIRCLAIM_CONTRACT,
        scope: accountName,
        table: 'accounts',
        lower_bound: 'FREEOS',
        limit: 1
      })
      const userAfterBalance = (resp3After.rows[0] && parseFloat(resp3After.rows[0].balance)) || 0
      commit('setUserAfterBalance', userAfterBalance)
      commit('setIsClaimed', true)
    } else {
      notifyAlert('err', 'The action could not be completed. Please try later') // Kenneth: Notify error in red
    }
    return result
  } catch (e) {
    console.log(e)
    // notifyAlert('err', 'Other error: ', e.message)
    // Kenneth: All of the following log messages should be replaced with Notify messages in red
    if (e.message === 'UnAuthorized') {
      notifyAlert('err', 'Please check that your wallet contains the correct keys for the account you are trying to register')
    } else if (e.message.startsWith('assertion failure with message: ')) {
      notifyAlert('err', e.message.split('assertion failure with message: ')[1])
    } else if (e.message === 'unrecognized private key type') {
      notifyAlert('err', 'There is a problem with your private key. Please check your wallet has the correct key(s)')
    // } else if (e instanceof RpcError || e instanceof TypeError) {
    //   notifyAlert('err', 'Connection error. Please try later') // Notify in red
    } else {
      notifyAlert('err', 'The action could not be completed. Please try later')
    }
  }
}
