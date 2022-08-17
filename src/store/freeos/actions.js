import notifyAlert from 'src/services/notify-alert'
// import { RpcError } from 'eosjs'
import { connect } from 'src/utils/smartContractRequest'
import ProtonSDK from '../../utils/proton'
import { FreeosBlockChainState } from '../../services/FreeosBlockChainState'
import { isFreeosEnabled } from './getters'

/**
 * Monitors the blockchain for changes related to the current user
 * @param {*} state
 */
export async function monitorBlockChain (state) {
  FreeosBlockChainState.getInstance().on('change', (data) => {
    if (data) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          state.commit('set' + key, data[key])
        }
      }
    }
  })
}
export async function fetch(state) {
  var result = await FreeosBlockChainState.getInstance().fetch()
  // Result of claim Error: assertion failure with message: user is not eligible to claim in this iteration
   return result;
}

export async function transfer ({ state }, submitData, account) {
  console.log('transfer', submitData)
  var result = await FreeosBlockChainState.getInstance().transfer(submitData, account)
  // Result of claim Error: assertion failure with message: user is not eligible to claim in this iteration

  console.log('Result of transfer', result)
  return result;
}

export async function register () {
  var result = await FreeosBlockChainState.getInstance().register()
  // Result of claim Error: assertion failure with message: user is not eligible to claim in this iteration
  return result;
}
export async function reregister() {
  var result = await FreeosBlockChainState.getInstance().reregister()
  // Result of claim Error: assertion failure with message: user is not eligible to claim in this iteration
  return result;
}


export async function claim () {
  var result = await FreeosBlockChainState.getInstance().claim()
  // Result of claim Error: assertion failure with message: user is not eligible to claim in this iteration

  console.log('Result of claim', result)
  return result;
}

export async function stake ({ state }, submitData) {
  var result = await FreeosBlockChainState.getInstance().stake(submitData)
  // Result of claim Error: assertion failure with message: user is not eligible to claim in this iteration
  console.log('Result of stake', result)
  return result;
}

export async function unstake () {
  var result = await FreeosBlockChainState.getInstance().unstake()
  // Result of claim Error: assertion failure with message: user is not eligible to claim in this iteration

  console.log('Result of unstake', result)
  return result;
}

export async function cancelUnstake () {
  var result = await FreeosBlockChainState.getInstance().cancelUnstake()
  // Result of claim Error: assertion failure with message: user is not eligible to claim in this iteration

  console.log('Result of cancelUnstake', result)
  return result;
}

export async function mintFreeBI({ state }, submitData) {
  var result = await FreeosBlockChainState.getInstance().mintFreeBI(submitData)
  // Result of claim Error: assertion failure with message: user is not eligible to claim in this iteration

  console.log('Result of mintFreeBI', result)
  return result;
}

export async function mintFreeos({ state }, submitData) {
  //submitData is an Array in this case
  var result = await FreeosBlockChainState.getInstance().mintFreeos(submitData)

  console.log('Result of mintFreeos', result)
  return result;
}


export async function unlock() {
  var result = await FreeosBlockChainState.getInstance().unlock()
  console.log('Result of unlock', result)
  return result;
}

export async function survey({ state }, submitData) {
  var result = await FreeosBlockChainState.getInstance().survey(submitData)
  console.log('Result of survey', result)
  return result;
}

export async function vote({ state }, submitData) {
  var result = await FreeosBlockChainState.getInstance().vote(submitData)
  console.log('Result of vote', result)
  return result;
}

export async function ratify({ state }, submitData) {
  var result = await FreeosBlockChainState.getInstance().ratify(submitData)
  console.log('Result of vote', result)
  return result;
}
