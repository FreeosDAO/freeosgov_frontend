import { Notify } from 'quasar'
import ProtonSDK from '../../utils/proton'

export async function transferTokens ({ state }, data) {
  const { fromAccountName, toAccountName, tokenType, sendAmount, memo } = data
  const actions = [{
    account: tokenType === 'XPR' ? 'eosio.token' : process.env.AIRCLAIM_CONTRACT,
    name: 'transfer',
    authorization: [{
      actor: fromAccountName,
      permission: 'active'
    }],
    data: {
      from: fromAccountName,
      to: toAccountName,
      quantity: `${parseFloat(sendAmount).toFixed(process.env.TOKEN_PRECISION)} ${tokenType}`,
      memo
    }
  }]

  try {
    const result = await ProtonSDK.sendTransaction(actions)
    let responseMessage = result.processed.action_traces[0].console
    if (!responseMessage) {
      responseMessage = 'Transfer successfully'
    }
    Notify.create({
      message: responseMessage,
      color: 'positive'
    })
    return result
  } catch (e) {
    return e
  }
}
