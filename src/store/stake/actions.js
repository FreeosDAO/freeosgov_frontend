import notifyAlert from 'src/services/notify-alert'
import { RpcError } from 'eosjs'
import ProtonSDK from '../../utils/proton'

export async function onRegisterUser ({ state }, accountName) {
  try {
    const actions = [{
      account: process.env.AIRCLAIM_CONTRACT,
      name: 'reguser',
      authorization: [{
        actor: accountName,
        permission: 'active'
      }],
      data: {
        user: accountName
      }
    }]
    const result = await ProtonSDK.sendTransaction(actions)
    return result
  } catch (e) {
    console.log(e)
  }
}

export async function actionStake ({ state }, data) {
  try {
    const { amount, accountName } = data
    const actions = [{
      account: 'eosio.token',
      name: 'transfer',
      authorization: [{
        actor: accountName,
        permission: 'active'
      }],
      data: {
        from: accountName,
        to: process.env.AIRCLAIM_CONTRACT,
        quantity: amount,
        memo: 'freeos stake'
      }
    }]

    const result = await ProtonSDK.sendTransaction(actions)
    if (result.processed.receipt.status === 'executed') {
      notifyAlert('success', result.processed.action_traces[0].console + 'success')
    } else {
      notifyAlert('err', 'The action could not be completed. Please try later')
    }
    return result
  } catch (e) {
    if (e.message.startsWith("Cannot read property 'stake_requirement'")) {
      notifyAlert('err', 'You are not yet registered with freeos')
    } else if (e.message === 'UnAuthorized') {
      notifyAlert('err', 'Please check that your wallet contains the correct keys for the account you are trying to register')
    } else if (e.message.startsWith('assertion failure with message: ')) {
      notifyAlert('err', e.message.split('assertion failure with message: ')[1])
    } else if (e.message === 'unrecognized private key type') {
      notifyAlert('err', 'There is a problem with your private key. Please check your wallet has the correct key(s)')
    } else if (e instanceof RpcError || e instanceof TypeError) {
      notifyAlert('err', 'Connection error. Please try later')
    } else {
      notifyAlert('err', 'The action could not be completed. Please try later')
    }
  }
}
