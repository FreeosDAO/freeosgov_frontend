import { connect } from 'src/utils/smartContractRequest'
import { Notify } from 'quasar'
import ProtonSDK from '../../utils/proton'

export async function getVestedRecord (state, accountName) {
  const config = {
    code: process.env.AIRCLAIM_CONTRACT, // the airclaim account
    scope: accountName, // the subset of the table to query
    table: 'vestaccounts', // the name of the table
    limit: 1
  }
  const result = await connect(config)
  state.commit('SET_BALANCE', result.rows[0])
}

export async function getUnVestHistory (state, data) {
  const { accountName, iterationNumber } = data
  const result = await connect({
    json: true,
    code: process.env.AIRCLAIM_CONTRACT,
    scope: accountName,
    table: 'unvests',
    limit: 1,
    lower_bound: iterationNumber
  })
  state.commit('SET_UNVEST_HISTORY', result.rows)
}

export async function getUnvestPercentage (state, accountName) {
  const result = await connect({
    json: true,
    code: process.env.AIRCLAIM_CONTRACT,
    scope: accountName,
    table: 'counters',
    limit: 1
  })
  state.commit('SET_UNVEST_PRECENTAGE', result.rows)
}
export async function unVest (state, accountName) {
  try {
    const actions = [{
      account: process.env.AIRCLAIM_CONTRACT, // the name of the airclaim contract (i'm using freeos333333 as a test account on Kylin)
      name: 'unvest', // name of the action to call
      authorization: [{
        actor: accountName, // the claim action is called on behalf of the user
        permission: 'active' // name of permission, e.g. this and the line above are the equivalent of  -p yvetecoleman@active
      }],
      data: {
        // Kenneth: only the following parameters required for claim action
        user: accountName // account name = yvetecoleman
      }
    }]
    const result = await ProtonSDK.sendTransaction(actions)

    if (result.processed.receipt.status === 'executed') {
      const response = result.processed.action_traces[0].console
      Notify.create({
        message: response,
        color: 'positive'
      })
      state.dispatch('getVestedRecord', accountName)
      state.dispatch('getUnVestHistory', accountName)
    } else {
      Notify.create({
        message: 'The action could not be completed. Please try later',
        color: 'negative'
      })
    }
  } catch (e) {
    console.log(e)
  }
}
