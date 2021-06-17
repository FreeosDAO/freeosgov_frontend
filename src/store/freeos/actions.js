import notifyAlert from 'src/services/notify-alert'
// import { RpcError } from 'eosjs'
import { connect } from 'src/utils/smartContractRequest'
import ProtonSDK from '../../utils/proton'
import { FreeosBlockChainState } from '../../services/FreeosBlockChainState'

/**
 * Monitors the blockchain for changes related to the current user
 * @param {*} state 
 */
export async function monitorBlockChain (state) {
  FreeosBlockChainState.getInstance().on('change', (data) => {
    console.log('data is now', data)    
    if (data) {
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          state.commit("set" + key, data[key])
        }
      }
      /*
        this.balance = data.XPRBalance;
        this.currentIteration = data.currentIteration;
        this.nextIteration = data.nextIteration;
        this.isRegistered = data.isRegistered;
        this.user = data.user;
        this.statistics = data.statistics;
        this.unvests = data.unvests;
  
        this.stakeRequirement = data.stakeRequirement ;
        this.userHasStaked = data.userHasStaked;
        this.canUnvest = data.canUnvest;
  
        this.userClaimedAlready = data.userClaimedAlready;
        */
    }
  })   
}
export async function fetch() {
  var result = await FreeosBlockChainState.getInstance().fetch();
  // Result of claim Error: assertion failure with message: user is not eligible to claim in this iteration

  console.log('Result of claim', result);
}

export async function register() {
  var result = await FreeosBlockChainState.getInstance().register();
  // Result of claim Error: assertion failure with message: user is not eligible to claim in this iteration

  console.log('Result of claim', result);
}

export async function claim () {
  var result = await FreeosBlockChainState.getInstance().claim();
   // Result of claim Error: assertion failure with message: user is not eligible to claim in this iteration

  console.log('Result of claim', result);
}