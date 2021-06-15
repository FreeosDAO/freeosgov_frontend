//import { connect } from 'src/utils/smartContractRequest'
import { EventEmitter } from 'events'
const { JsonRpc } = require('eosjs')
// endpoint
const rpc = new JsonRpc('https://' + process.env.NETWORK_HOST + ':' + process.env.NETWORK_PORT, { fetch })

import { Loading, Notify } from 'quasar'
import ProtonSDK from '../utils/proton' 

function connect (config) {
      return rpc.get_table_rows(config);
}
  

export class FreeosBlockChainState extends EventEmitter {
    static sInstance = null;

    static getInstance() {
        var sInstance = FreeosBlockChainState.sInstance;

        if (!sInstance) {
            FreeosBlockChainState.sInstance = sInstance = new FreeosBlockChainState()
        }
        

        console.log('sInstance.isRunning', sInstance.isRunning)

        return sInstance 
    }

    constructor() {
        super();
      this.start();
    }

    setWalletUser(walletUser) {
        this.walletUser = walletUser
    }

  /**
   * Starts monitor for changes on the block chain
   */
  start() {
      if (this.isRunning) return;

      this.isRunning = true;
    console.log('Starting...');
    
    var fetchTimer = () => {        
        console.log("Fetching data....")

        ProtonSDK.restoreSession().then((auth) => {
            console.log('Wallet session restored', auth );

            this.setWalletUser({
                accountName: (auth ? auth.auth.actor : null),
                walletId: ProtonSDK && ProtonSDK.link ? ProtonSDK.link.walletType : null
            });

            console.log('NOW WALLET USER IS: ' , this.walletUser );

            this.actionFetch().then((data) => {
                this.emit("change", data);
                if (this.timer) clearTimeout(this.timer);
                this.timer = setTimeout(fetchTimer, 775000);
            }).catch(err => {
                console.log("Problem fetching data", err);
                if (this.timer) clearTimeout(this.timer);
                this.timer = setTimeout(fetchTimer, 775000);
            })

        });
    };
    fetchTimer();    
  }

  stop() {
    this.isRunning=false;
    if (this.timer) {
        clearTimeout(this.timer)
        this.timer = null
     }
  }

  async register() {
    return this.sendTransaction(process.env.AIRCLAIM_CONTRACT, 'reguser');
  }

  async sendTransaction(contractAccountName, contractName) {
    console.log('sendTransaction', this.walletUser);

    var accountName = this.walletUser ? this.walletUser.accountName : null;
    if (!accountName) {
        console.log('No account.....');
        return;
    }
    try {
        const actions = [{
          account: contractAccountName,
          name: contractName,
          authorization: [{
            actor: accountName,
            permission: 'active'
          }],
          data: {
              user: accountName
          }
        }]
        console.log('Sending transaction with', actions);
        const result = await ProtonSDK.sendTransaction(actions)

        setTimeout(() => {
            this.fetch(); // Do a manual fetch of current state
        }, 500)
        
        return result;
    } catch (e) {
        console.log('Problem sendingTransaction ' + contractName, e)
    }
  }


  async claim() {
    return this.sendTransaction(process.env.AIRCLAIM_CONTRACT, 'claim');
  }
  
  async fetch () {
      try {
        this.stop();
        this.actionFetch();
      }
      finally {
        this.start();
      }
  }

  async actionFetch () {
    console.log('state.state.accountName', this.walletUser ? this.walletUser.accountName : "N/A")

 
      var masterswitch = await this.getRecord(process.env.AIRCLAIM_CONFIGURATION_CONTRACT, 'parameters', null, { lower_bound: "masterswitch", limit: 1 })
    console.log('masterswitch', masterswitch);
    var isFreeosEnabled = masterswitch ? masterswitch.value == "1" : false;

    // Row data
    //{"iteration_number":1,"start":"2021-04-27T22:59:59.000","end":"2021-04-28T04:00:00.000","claim_amount":100,"tokens_required":0}
    var currentIterationPromise = await this.getRecord(process.env.AIRCLAIM_CONFIGURATION_CONTRACT, 'iterations')
    
    // {"stake":"0.0000 XPR","account_type":101,"registered_time":"2021-03-01T07:10:04","staked_iteration":0,"votes":0,"issuances":0,"last_issuance":0}
    
    // {"usercount":36,"claimevents":58,"unvestpercent":0,"unvestpercentiteration":1,"iteration":1,"failsafecounter":1}
    var bcStatisticsPromise = this.getRecord(process.env.AIRCLAIM_CONTRACT, 'statistics')
    // Currently empty
    var bcUnvestsPromise = this.getRecord(process.env.AIRCLAIM_CONTRACT, 'unvests')

    var bcStateRequirementsPromise = this.getRecord(process.env.AIRCLAIM_CONFIGURATION_CONTRACT, 'stakereqs')

    var bcXPRBalancePromise = null;
    var bcUnstakingPromise = null;
    var optionsPromise = null;
    var bcVestaccountsPromise = null;
    var bcFreeosBalancePromise = null;
    var bcAirkeyBalancePromise = null;
    var bcUserPromise = null;

    console.log('state.state.accountName', this.walletUser);

    var dataRequests = [currentIterationPromise,bcStatisticsPromise,bcUnvestsPromise,bcStateRequirementsPromise];

    if (this.walletUser) {
        bcUserPromise = this.getUserRecord(process.env.AIRCLAIM_CONTRACT, 'users')
        //{"rows":[{"balance":"24920.0000 XPR"}],"more":false,"next_key":""}
        var stakingCurrency = process.env.STAKING_CURRENCY || "XPR";
        bcXPRBalancePromise = this.getUserRecordAsNumber(process.env.CURRENCY_CONTRACT, 'accounts', { upper_bound: stakingCurrency, limit: 1 }, "balance")
        bcUnstakingPromise = this.getUserRecord(process.env.AIRCLAIM_CONTRACT,'unstakereqs', {  limit: 1 })
        optionsPromise = this.getUserRecordAsNumber(process.env.AIRCLAIM_CONTRACT,'accounts', {  upper_bound:"OPTION", limit: 1 }, "balance")
        bcVestaccountsPromise = this.getUserRecordAsNumber(process.env.AIRCLAIM_CONTRACT,'vestaccounts', {  upper_bound:"OPTION", limit: 1 }, "balance")
        bcFreeosBalancePromise = this.getUserRecordAsNumber(process.env.FREEOSTOKENS_CONTRACT,'accounts', {  upper_bound:"FREEOS", limit: 1 }, "balance")
        bcAirkeyBalancePromise = this.getUserRecordAsNumber(process.env.AIRCLAIM_CONTRACT,'accounts', {  upper_bound:"AIRKEY", limit: 1 }, "balance")
        dataRequests = dataRequests.concat([bcUserPromise, bcXPRBalancePromise,bcUnstakingPromise,optionsPromise,bcVestaccountsPromise,bcFreeosBalancePromise,bcAirkeyBalancePromise]);
    }

    var outputValues = await Promise.all(dataRequests); //.then((values) => {
    let [currentIteration, bcStatistics,bcUnvests,bcStateRequirements,bcUser,bcXPRBalance,bcUnstaking,liquidOptions,vestedOptions,freeosBalance,bcAirkeyBalance] = outputValues;
    console.log('WE HAVE DATA' ,outputValues)
    if (!bcAirkeyBalance) bcAirkeyBalance = 0;
    if (!liquidOptions) liquidOptions = 0;
    if (!vestedOptions) vestedOptions = 0;    
    if (!freeosBalance) freeosBalance = 0;    
    
    
    var iterations = this.getCurrentAndNextIteration(currentIteration);
    
    var currentIterationIdx = (iterations != null && iterations.currentIteration ?  iterations.currentIteration.iteration_number : -1);

    console.log('currentIterationIdx', currentIterationIdx );

    var unvestedAlready = bcUnvests!=null && bcUnvests.iteration_number == currentIterationNumber;

    var canUnvest = bcUnvests != null && bcUnvests.unvestPercent > 0 && !unvestedAlready;

    var registeredUserCount = bcStatistics.numusers;
    var stakeRequirement = null;
    var userHasStaked = false;
    var userClaimedAlready = false;
    var userEligibleToClaim = false;
    var holdingRequirement = (iterations != null && iterations.currentIteration) ? iterations.currentIteration.tokens_required : 9999999;
    var userMeetsHoldingRequirement = false;
    var userMeetsStakeRequirement = false;
    var userStake = 0;
    var totalHolding = 0;
    var reasonCannotClaim = '';

    if (bcUser) { // Registered
        var userAccountType = bcUser.account_type; // (will be a 'd', 'e' or 'v')
        for (var stakeReq of bcStateRequirements) {
            if (stakeReq.numusers < stakeReq.threshold) {
                stakeRequirement = stakeReq['requirement_' + userAccountType];
            }
        }

        totalHolding = liquidOptions + vestedOptions + freeosBalance;
        userStake = parseFloat(bcUser.stake);
        userHasStaked = bcUser.staked_iteration > 0;
        userClaimedAlready = bcUser.last_issuance = currentIterationIdx;

        userMeetsHoldingRequirement = bcAirkeyBalance > 0 || totalHolding >= holdingRequirement;
        userMeetsStakeRequirement = bcAirkeyBalance > 0 || userHasStaked;

        userEligibleToClaim = currentIterationIdx > 0 && userMeetsHoldingRequirement && userMeetsStakeRequirement && !userClaimedAlready;

        
        if (!userEligibleToClaim) {
          if (currentIterationIdx <=0) {
            reasonCannotClaim  = 'Airclaim Not Started'
          }
          else if (!userMeetsHoldingRequirement) {
            reasonCannotClaim = "Opps! In order to Claim you need a minimum " + iterations.currentIteration.tokens_required + " OPTIONS in your Wallet. Please <a href='/#/transfer'>transfer</a> an additional " + (iterations.currentIteration.tokens_required - totalHolding) + " FREEOS in order to Claim";
          }

          else if (userClaimedAlready) {
            reasonCannotClaim = 'You have already claimed';
          }
          
        }

    }



      var output = {
        liquidOptions : liquidOptions,
            currentIteration: iterations.currentIteration,
            nextIteration: iterations.nextIteration,
            user : bcUser,
            isRegistered : bcUser != null,
            statistics: bcStatistics,
            unvests : bcUnvests,
            canUnvest : canUnvest,
        bcStateRequirements,

        XPRBalance: bcXPRBalance,
        bcUnstaking,
        vestedOptions,
        liquidFreeos : freeosBalance,
        airkeyBalance : bcAirkeyBalance,
        

        stakeRequirement : stakeRequirement,
        userHasStaked: userHasStaked,
        userClaimedAlready : userClaimedAlready,
        userStake : userStake,
        userMeetsStakeRequirement : userMeetsStakeRequirement,
        totalFreeos : totalHolding,
        canClaim : userEligibleToClaim,

        isFreeosEnabled : isFreeosEnabled,
        reasonCannotClaim : reasonCannotClaim
    }

      console.log('output',output);

    return output;
    // alert(process.env.AIRCLAIM_CONTRACT)
    /*
    const result = await connect({
      json: true,
      code: process.env.AIRCLAIM_CONTRACT,
      scope: process.env.AIRCLAIM_CONTRACT,
      table: 'stakes' // the name of the table
    })
    const val = {
      key: 'respStakeRequirement',
      value: result.rows[0]
    }

    console.log('val', val)

    return val
    */
  }

  async getUserRecordAsNumber(scopeName, tableName, additionalParams, propertyName) {
    var obj = await this.getUserRecord(scopeName, tableName, additionalParams);
    if (obj && obj[propertyName]) {
        var s = obj[propertyName];
        return parseFloat(s)
    }
    return null;
  }

  async getUserRecord(scopeName, tableName, additionalParams) {
      return this.getRecord(scopeName, tableName, this.walletUser.accountName, additionalParams)
  }

  async getRecord(codeName, tableName, scopeName, additionalParams) {
    console.log('getRecord...',codeName, tableName)

    if (!scopeName) scopeName = codeName

    var query = {
        json: true,
        code: codeName,
        scope: scopeName,
        table: tableName // the name of the table
      };

    if (additionalParams) {
        query.limit = additionalParams.limit
        query.upper_bound = additionalParams.upper_bound
        query.lower_bound = additionalParams.lower_bound
    }

    const result = await connect(query)
    console.log('result',codeName, tableName,result)

    if (result && result.rows) {
        if (result.rows.length === 1) {
            return result.rows[0]
        }
        else if (result.rows.length>0) {
            return result.rows;
        }
        else {
            return null;
        }
    }
    return null;
  }


    getCurrentAndNextIteration(rows) {
      console.log('getCurrentAndNextIteration', rows);

        const currentTimeStamp = new Date(); // Math.floor((new Date()).getTime() / 1000)
        var nextIteration = {
          iteration_number: 0
        };
        var currentIteration = null;

        if (rows && rows.length) {
          rows.map((row, index) => {
            const startTimeStamp = new Date(row.start)
            const endTimeStamp = new Date(row.end)
            
            console.log('startTimeStamp', startTimeStamp);

            if (currentTimeStamp > startTimeStamp && currentTimeStamp < endTimeStamp) {
              currentIteration = rows[index];
              if (rows.length === (index + 1)) {
                nextIteration = rows[index + 1]
              } else {
                nextIteration = null
              }
            }
          })
        }
        return { currentIteration, nextIteration }
    }

}
