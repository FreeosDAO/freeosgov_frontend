// IMPORTS
import { EventEmitter } from 'events'
import { env } from 'process';
import ProtonSDK from '../utils/proton'
const { JsonRpc } = require('eosjs')

// Setup Proton RPC Client
const rpc = new JsonRpc('https://' + process.env.NETWORK_HOST + ':' + process.env.NETWORK_PORT, {fetch})

// FreeosBlockChainState class
export class FreeosBlockChainState extends EventEmitter {

  /**
   * Setup Vars
   */
  static isRunning = false;
  static sInstance = null;
  static walletUser = {};
  static parametersTable;
  static dparametersTable;
  static systemRow;

  constructor() {
    super()
    this.start()
  }

  /**
   * Starts monitor for changes on the block chain
   */
  async start() {
    
    if (this.isRunning) return
    this.isRunning = true

    var fetchTimer = async () => {

      const { auth } = await ProtonSDK.restoreSession();


      this.setWalletUser({
        accountName: (auth ? auth.actor : null),
        walletId: ProtonSDK && ProtonSDK.link ? ProtonSDK.link.walletType : null,
        permission: (auth ? auth.permission : null)
      })


      this.actionFetch().then((data) => {
        this.emit('change', data)
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(fetchTimer, process.env.TIMED_FETCH_DELAY)
      }).catch(err => {
        if (this.timer) clearTimeout(this.timer)
        this.timer = setTimeout(fetchTimer, process.env.TIMED_FETCH_DELAY)
        console.error(err);
      })

    }
    fetchTimer()
  }

  /**
   * Returns new class instance
   */
   static getInstance() {
    var sInstance = FreeosBlockChainState.sInstance

    if (!sInstance) {
      FreeosBlockChainState.sInstance = sInstance = new FreeosBlockChainState()
    }

    return sInstance
  }

  /**
   * Fetch the current state
   */
   async fetch() {
    try {
      this.stop()
      await this.actionFetch()
    } finally {
      await this.start()
    }
  }

  /**
   * Manually do Fetch
   */
  async singleFetch() {
    const { auth } = await ProtonSDK.restoreSession()

    this.setWalletUser({
      accountName: (auth ? auth.actor : null),
      walletId: ProtonSDK && ProtonSDK.link ? ProtonSDK.link.walletType : null
    })


    this.actionFetch().then((data) => {
      this.emit('change', data)
    }).catch(err => {
      console.log('Problem fetching data', err)
    })

  }

  /**
   * Main Fetch Function - get all the vars!
   */
   async actionFetch() {

    // setup output
    var output = {}
    output['isAuthenticated'] = false

    /**
     * Currency Names
     */
    output['currencies'] = {
      'freeos': process.env.CURRENCY_NAME,
      'point': process.env.TOKEN_CURRENCY_NAME,
      'freebi': process.env.FREEBI_CURRENCY_NAME,
      'xpr': process.env.XPR_CURRENCY_NAME,
      'xusdc': process.env.XUSDC_CURRENCY_NAME,
    }

    /**
     * Get Contract Tables
     */

    let tableNames = ['parameters', 'dparameters', 'system', 'surveyrecord']
    let tables = await Promise.all(tableNames.map(async table => {
      return await this.getRecord(process.env.FREEOSGOV_CONTRACT, table, null, {limit: 100})
    }));

    [this.parametersTable, this.dparametersTable, this.systemRow, this.surveyRecord] = tables;

    // add to output
    output['parametersTable'] = this.parametersTable
    output['dparametersTable'] = this.dparametersTable
    output['systemRow'] = this.systemRow
    output['surveyRecord'] = this.surveyRecord;

    /**
     * Grab Main Vars
     */

    // Master switch
    var masterSwitch = this.getParameterFromTable('masterswitch', this.parametersTable, 0)

    // Get Price Label
    var priceLabel = this.getParameterFromTable('pricelabel', this.parametersTable, '')

    // Get current and next iterations
    var iterations = this.getCurrentAndNextIteration()

    // add to output
    output['masterSwitch'] = masterSwitch
    output['priceLabel'] = priceLabel
    output['iterations'] = iterations


    output['isFreeosEnabled'] = masterSwitch === '1' ? true : false



    /**
     * Grab User Vars
     */

    // checks if user logged in
    if (this.walletUser && this.walletUser.accountName){

      // Setup user
      var user = {}

      // user name
      user['name'] = this.walletUser.accountName

      const kycContract = process.env.KYC_CONTRACT ? process.env.KYC_CONTRACT: 'eosio.proton'


      // vars setup
      let userQueries = [
        {contract: process.env.FREEOSGOV_CONTRACT, table: 'participants', scope: user.name, params: {limit: 1}},
        {contract: process.env.FREEOSGOV_CONTRACT, table: 'accounts', scope: user.name, params: {limit: 1, lower_bound: output.currencies.point, upper_bound: output.currencies.point}},
        {contract: process.env.FREEOSGOV_CONTRACT, table: 'vestaccounts', scope: user.name, params: {limit: 1, lower_bound: output.currencies.point, upper_bound: output.currencies.point}},
        {contract: process.env.FREEBITOKENS_CONTRACT, table: 'accounts', scope: user.name, params: {limit: 1, lower_bound: output.currencies.freebi, upper_bound: output.currencies.freebi}},
        {contract: process.env.FREEOSTOKENS_CONTRACT, table: 'accounts', scope: user.name, params: {limit: 1, lower_bound: output.currencies.freeos, upper_bound: output.currencies.freeos}},
        {contract: process.env.FREEOSGOV_CONTRACT, table: 'mintfeefree', scope: user.name, params: {limit: 1}},
        {contract: process.env.XPR_CURRENCY_CONTRACT, table: 'accounts', scope: user.name, params: {limit: 1, lower_bound: output.currencies.xpr, upper_bound: output.currencies.xpr}},
        {contract: process.env.XUSDC_CURRENCY_CONTRACT, table: 'accounts', scope: user.name, params: {limit: 1, lower_bound: output.currencies.xusdc, upper_bound: output.currencies.xusdc}},
        {contract: kycContract, table: 'usersinfo', scope: kycContract, params: {limit: 1, upper_bound: this.walletUser.accountName, lower_bound: this.walletUser.accountName}},
        {contract: process.env.FREEOSGOV_CONTRACT, table: 'unvests', scope: user.name, params: {limit: 1}},
        {contract: process.env.DIVIDEND_CONTRACT, table: 'nfts', scope: process.env.DIVIDEND_CONTRACT, params: {limit: 1, index_position: 3, upper_bound: this.walletUser.accountName, lower_bound: this.walletUser.accountName, key_type: 'i64'}}
      ]


      let userVars = await Promise.all(userQueries.map(async query => {
        return await this.getRecord(query.contract, query.table, query.scope, query.params)
      }));
      
      [ 
        user['record'],
        user['pointBalance'], user['lockedBalance'], user['freebiBalance'], user['freeosBalance'],
        user['mffBalance'],
        user['XPRBalance'], user['XUSDCBalance'], user['preRegistration'] ,
        user['lastUnlock'],
        user['hasNFT']
     ] = userVars
     

      // Filter Balances
      user = this.filterBalances(user)
      
      // Add to output
      output['user'] = user
      output['isAuthenticated'] = true
      output['accountName'] = user.name
      output['isRegistered'] = user && user['record'] !== null ? true : false
      // KYC PreRegistration Account
      var accountType = null;
      if (output['isRegistered']) { // Registered
        accountType = user['record'].account_type;
      } else if (user['preRegistration']) {
        accountType = 'd'; //account type d
        if(user['preRegistration'].kyc){
          var kyc = user['preRegistration'].kyc;
          console.log('kyc', kyc);
          for (var i = 0; i < kyc.length+1; ++i) {
            for (const prop in kyc[i]) {
              if (kyc[i][prop].includes('firstname') && kyc[i][prop].includes('lastname')) {
                accountType = 'v'; //account type v
                break
              }
            }
          }
        }
      } else {
        accountType = 'e' //account type e;
      }
      
      output['accountType'] = accountType;
      output['isVerified'] = accountType === 'v' || accountType === 'b' || accountType === 'c' || user['hasNFT'] ? true : false;



      //Survey Results
      output['voteCompleted'] = false;
      output['surveyCompleted'] = false;
      output['ratifyCompleted'] = false;
      const svrsTable = await this.getUserRecord(process.env.FREEOSGOV_CONTRACT, 'svrs', {limit: 1});

      console.log('iterations.current', iterations.current)

      console.log('this.systemRow.init', this.systemRow.iteration)
      for (const item in svrsTable) {
        if(svrsTable[item]===iterations.current){
          if(item.indexOf("vote") >= 0) output['voteCompleted'] = true;
          if(item.indexOf("ratify") >= 0) output['ratifyCompleted'] = true;
          if(item.indexOf("survey") >= 0) output['surveyCompleted'] = true;
        }
      } 

      // Check nextActivity
      let nextActivity = {type: false, message: ''};
      if(iterations.surveyPeriodActive && !output['surveyCompleted']){
        nextActivity.type = 'Survey'
        nextActivity.message = 'Earn '+output.currencies.point+'S, participate in the Survey'
      } 
      else if(iterations.votePeriodActive && !output['voteCompleted']){
        nextActivity.type = 'Vote'
        nextActivity.message = 'Earn '+output.currencies.point+'S, participate in the Vote'
      } 
      else if(iterations.ratifyPeriodActive && !output['ratifyCompleted']){
        nextActivity.type = 'Ratify'
        nextActivity.message = 'Earn '+output.currencies.point+'S, Ratify the Vote'
      }
      output['nextActivity'] = nextActivity

      // Check eligible to claim
      const rewardsTable = await this.getRecord(process.env.FREEOSGOV_CONTRACT, 'rewards', process.env.FREEOSGOV_CONTRACT, {limit: 4});
      var eligibleToClaim = this.checkEligibleToClaim( iterations.current, svrsTable, user.record, rewardsTable )
      output['eligibleToClaim'] = eligibleToClaim
    }
    /**
     * Exchange Rate Vars
     */
     const exchangeRate = await this.getRecord(process.env.FREEOSGOV_CONTRACT, 'exchangerate');
     output['currentPrice'] = exchangeRate && exchangeRate.currentprice ? (exchangeRate.currentprice / 1).toFixed(6) : 0;
     output['targetPrice'] = exchangeRate && exchangeRate.targetprice ? (exchangeRate.targetprice / 1).toFixed(6) : 0;

     const xprContract = await this.getRecord(process.env.FREEOSGOV_CONTRACT, 'currencies', process.env.FREEOSGOV_CONTRACT, {limit: 1, lower_bound: process.env.XPR_CURRENCY_PRECISION + ','+output.currencies.xpr, upper_bound: process.env.XPR_CURRENCY_PRECISION + ','+output.currencies.xpr});
     console.log('xprContract', xprContract)
     output['xprContract'] = xprContract;

     const usdContract = await this.getRecord(process.env.FREEOSGOV_CONTRACT, 'currencies', process.env.FREEOSGOV_CONTRACT, {limit: 1, lower_bound: process.env.XUSDC_CURRENCY_PRECISION + ','+output.currencies.xusdc, upper_bound: process.env.XUSDC_CURRENCY_PRECISION + ','+output.currencies.xusdc});
     console.log('usdContract', usdContract)
     output['usdContract'] = usdContract;

     const freeosContract = await this.getRecord(process.env.FREEOSGOV_CONTRACT, 'currencies', process.env.FREEOSGOV_CONTRACT, {limit: 1, lower_bound: process.env.TOKEN_PRECISION + ','+output.currencies.freeos, upper_bound: process.env.TOKEN_PRECISION + ','+output.currencies.freeos});
     //console.log('freeosContract', freeosContract)
     output['freeosContract'] = freeosContract;


    //Announcement Popup
     var announcetext = this.getParameterFromTable('announcetext', this.parametersTable, '');
     var announceid = this.getParameterFromTable('announceid', this.parametersTable, '');
     var announcelink = this.getParameterFromTable('announcelink', this.parametersTable, '');
     var announceimg = this.getParameterFromTable('announceimg', this.parametersTable, '');
     output['announceObj'] = {
       text: announcetext ? announcetext : null,
       id: announceid ? announceid : null,
       link: announcelink ? announcelink : null,
       img: announceimg ? announceimg : null,
     } 
 
    /**
     * Survey Vars
     */

    //dparametersTable vars
    output['surveyShare'] =  parseFloat(this.getParameterFromTable('surveyshare', this.dparametersTable, '')).toFixed(2) * 100;
    output['voteShare'] =  parseFloat(this.getParameterFromTable('voteshare', this.dparametersTable, '')).toFixed(2) * 100;
    output['ratifyShare'] =  parseFloat(this.getParameterFromTable('ratifyshare', this.dparametersTable, '')).toFixed(2) * 100;
    output['lockFactor'] =  parseFloat(this.getParameterFromTable('lockfactor', this.dparametersTable, '')).toFixed(2);
    output['mintFeeMin'] = parseFloat(this.getParameterFromTable('mintfeemin', this.dparametersTable, ''));


    /* Vars calculated via Iterations */
    output['voteClosesIn'] = iterations['voteClosesIn'];
    output['surveyClosesIn'] = iterations['surveyClosesIn'];
    output['voteStartsIn'] = iterations['voteStartsIn'];
    output['surveyPeriodActive'] = iterations['surveyPeriodActive'];
    output['votePeriodActive'] = iterations['votePeriodActive'];
    output['ratifyStartsIn'] = iterations['ratifyStartsIn'];
    output['ratifyPeriodActive'] = iterations['ratifyPeriodActive'];
    output['ratifyClosesIn'] = iterations['ratifyClosesIn'];
    output['nextClaimIn'] = iterations['nextClaimIn'];
    output['currentIteration'] = iterations['current'];
    output['airclaimStatus'] = iterations['airclaimStatus'];
    

    // Rewards i.e issuance_rate && mint_fee_percent
    const lastRewardsTable = await this.getRecord(process.env.FREEOSGOV_CONTRACT, 'rewards', process.env.FREEOSGOV_CONTRACT, {limit: 1, lower_bound: iterations.current - 1, upper_bound: iterations.current - 1});
    if(lastRewardsTable) output['rewardsPrevious'] = lastRewardsTable;

    const thisRewardsTable = await this.getRecord(process.env.FREEOSGOV_CONTRACT, 'voterecord', process.env.FREEOSGOV_CONTRACT, {limit: 1});
    if(thisRewardsTable) output['rewardsCurrent'] = thisRewardsTable;

    /**
     * Output vars
     */
    console.log('output', output)
    return output
    
  }

  /**
   * Sets the wallet user
   */
  setWalletUser(walletUser) {
    this.walletUser = walletUser
  }

  /**
   * Stops monitoring
   */
  stop() {
    this.isRunning = false
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  /**
   * Helper to send transaction
   */
  async sendTransaction(contractAccountName, contractName, extraData, extraAction) {
    var accountName = this.walletUser ? this.walletUser.accountName : null
    var actionData = {}

    if (extraData) {
      actionData = extraData
    } else {
      actionData.user = accountName
    }

    if (!accountName) {
      console.log('No account.....')
      return
    }
    try {
      let actions = [{
        account: contractAccountName,
        name: contractName,
        authorization: [{
          actor: accountName,
          permission: this.walletUser.permission
        }],
        data: actionData
      }]
      // push extra action if exists
      if(extraAction){
        actions.push(extraAction)
      }
      console.log('Sending transaction with', actions)
      const result = await ProtonSDK.sendTransaction(actions)

      setTimeout(() => {
        this.fetch() // Do a manual fetch of current state
      }, process.env.FETCH_DELAY)

      return result


    } catch (e) {
      console.log('Problem sendingTransaction ' + contractName, e)
    }
  }



  createTransaction(contractAccountName, contractName, extraData) {
    var accountName = this.walletUser ? this.walletUser.accountName : null
    var actionData = {}

      if (!accountName) {
        console.log('No account.....')
        return
      }


      if (extraData) {
        actionData = extraData
      } else {
        actionData.user = accountName
      }

      var action = {
        account: contractAccountName,
        name: contractName,
        authorization: [{
          actor: accountName,
          permission: 'active'
        }],
        data: actionData
      }


      return action
  }


 


  /**
   * CRONACLE INTEGRATION
   * Is this needed?
   */
  
  /*
  // API Calls to get token prices
  async getPrices(){
    let prices = {btcPrice: 0, freeosPrice: 0}
    try {
      // get prices
      let [btcResponse, freeosResponse] = await Promise.all([
        fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin',{timeout: 2000}),
        fetch('https://api.protonchain.com/v1/chain/exchange-rates/info',{timeout: 2000})
      ]);
    
      // find BTC
      btcResponse = await btcResponse.json()
      // Iterate over btcresponse
      btcResponse.forEach((object) => {
        // if btc
        if (object.symbol == 'btc') {
          // return price
          prices.btcPrice = object.current_price;
        }
      })

      // find freeos
      freeosResponse = await freeosResponse.json()
      // iterate over freeosResponse
      freeosResponse.forEach((object) => {
        // if freeos
        if (object.symbol == 'FREEOS') {
          // check rates
          object.rates.forEach((rate) => {
            if (rate.counterCurrency == 'USD') {
              // return price
              prices.freeosPrice = rate.price;
            }
          })
        }
      })
    }
    catch(err) {
      console.log(err);
    }
    console.log('prices:', prices)
    return prices
  }

  // Setup Cronacle
  async setupCronacle(){

    // Check Cronacle Params
    let cronenabled = this.parametersTable.filter(function(row){
      return row.paramname == 'cronenabled'
    })
    cronenabled = (cronenabled.length) ? cronenabled[0].value : 0
    console.log('cronenabled:', cronenabled)
    if(cronenabled != 1){
      console.log('Cronacle Disabled')
      return
    }

    // Check wallet name
    var accountName = this.walletUser ? this.walletUser.accountName : null
    if (!accountName) {
      console.log('No account.....')
      return
    }

    // get Prices
    let prices = await this.getPrices()

    // If BTC or FREEOS price, add action
    if(prices.btcPrice || prices.freeosPrice){
      // setup action
      let action = {
        account: 'cronacle',
        name: 'storeprices',
        authorization: [{
          actor: accountName,
          permission: 'active'
        }],
        data: {
          user: accountName,
          btcprice: prices.btcPrice,
          freeosprice: prices.freeosPrice
        }
      };
      
      return action
    }
    
    // else return nothing
    return
  }
  */


  /**
   * Transaction functions
   */
  async register() {
    return this.sendTransaction(process.env.FREEOSGOV_CONTRACT, 'reguser')
  }

  async reregister() {
    return this.sendTransaction(process.env.FREEOSGOV_CONTRACT, 'reregister')
  }

  async mintFreeBI(sendData) {
    //let cronacle = await this.setupCronacle()
    return this.sendTransaction(process.env.FREEOSGOV_CONTRACT, 'mintfreebi', sendData)
  }

  async claim() {
    //let cronacle = await this.setupCronacle()
    return this.sendTransaction(process.env.FREEOSGOV_CONTRACT, 'claim')
  }

  async unlock() {
    //let cronacle = await this.setupCronacle()
    return this.sendTransaction(process.env.FREEOSGOV_CONTRACT, 'unlock')
  }

  async transfer(sendData, contractAccountName) {
    var contract;
    if(contractAccountName){
      contract = contractAccountName;
    }else{
      var contract = process.env.FREEOSTOKENS_CONTRACT
      if (sendData.token === process.env.FREEBI_CURRENCY_NAME) {
        contract = process.env.FREEBITOKENS_CONTRACT
      }
    }

    delete sendData.token
    return this.sendTransaction(contract, 'transfer', sendData)
  }




  async mintFreeos(sendDataArray) {
    //let cronacle = await this.setupCronacle()
    let actions = [];

    const _ = this;

    sendDataArray.forEach(function (item, index) {
      var contract = item.contract;
      delete item.contract;
      var table = item.mint_fee_currency  ? 'mintfreeos' : 'transfer';
    
      var action = _.createTransaction(contract, table, item);
      actions.push(action);
    });

    console.log('mintfreeos Action Data', actions)

    try {

      const result = await ProtonSDK.sendTransaction(actions)


      console.log('mintFreeosmintFreeos Result', result)
      return result


    } catch (e) {
      console.log('Problem sendingTransaction mintfreeos')
    }


  }


  async survey(sendData) {
    //let cronacle = await this.setupCronacle()
    return this.sendTransaction(process.env.FREEOSGOV_CONTRACT, 'survey', sendData)
  }

  async vote(sendData) {
    //let cronacle = await this.setupCronacle()
    return this.sendTransaction(process.env.FREEOSGOV_CONTRACT, 'vote', sendData)
  }

  async ratify(sendData) {
    //let cronacle = await this.setupCronacle()
    return this.sendTransaction(process.env.FREEOSGOV_CONTRACT, 'ratify', sendData)
  }



  /**
   * Logout
   */
  async logout() {
    await this.setWalletUser({})
    await this.singleFetch();
  }

  /**
   * Gets the requested table rows
   */
  getTableRows(config) {
    return rpc.get_table_rows(config)
  }

  /**
   * Checks if username is valid
   */
   async isValidUsername(name) {
    name = name.toLowerCase()
    let res = await rpc.get_account(name).catch(e => false);
    if (!res) {
      //accountname not found
      return false;
    } else {
      return true;
    }
  }

  /**
   * Checks if username is registered with freeosgov
   */
  async isValidFreeosUser(name){
    name = name.toLowerCase();
    let res = await this.getRecord(process.env.FREEOSGOV_CONTRACT, 'participants', name, {limit: 1}).catch(e => false);
    if (!res) {
      //accountname not found
      return false;
    } else {
      return true;
    }
  }

  /**
   * Gets parameter from parametersTable
   */
  getParameterFromTable(param, table, ifNull = null){
    let request = table.filter(function(row){
      return row.paramname == param
    })
    request = (request.length) ? request[0].value : ifNull
    return request
  }

  /**
   * Get user record and converts to number
   */
  async getUserRecordAsNumber(scopeName, tableName, additionalParams, propertyName) {
    var obj = await this.getUserRecord(scopeName, tableName, additionalParams)
    if (obj && obj[propertyName]) {
      var s = obj[propertyName]
      return parseFloat(s)
    }
    return null
  }

  /**
   * Gets the requested user record
   */
  async getUserRecord(scopeName, tableName, additionalParams) {
    return this.getRecord(scopeName, tableName, this.walletUser.accountName, additionalParams)
  }

  /**
   * Gets the requested record
   */
  async getRecord(codeName, tableName, scopeName, additionalParams) {
    // console.log('getRecord...',codeName, tableName)

    if (!scopeName) scopeName = codeName

    var query = {
      json: true,
      code: codeName,
      scope: scopeName,
      table: tableName // the name of the table
    }

    if (additionalParams) {
      query.limit = additionalParams.limit
      query.upper_bound = additionalParams.upper_bound
      query.lower_bound = additionalParams.lower_bound
      query.index_position = additionalParams.index_position
      query.key_type = additionalParams.key_type
    }

    const result = await this.getTableRows(query)
    // console.log('result',codeName, tableName,result)

    if (result && result.rows) {
      if (result.rows.length === 1) {
        return result.rows[0]
      } else if (result.rows.length > 0) {
        return result.rows
      } else {
        return null
      }
    }
    return null
  }

  /**
   * Gets current and next iteration count
   */
  getCurrentAndNextIteration() {

    // Gather vars
    let init = new Date(this.systemRow.init + "Z").getTime();
    let now = new Date().getTime();  //GET UTC TimeZone Offset and add to Current Local Timestamp
    let nowHourLater = new Date(now + 2 * 60 * 60 * 1000).getTime();
    let airclaimStatus = null;

console.log('now', now);


    if (nowHourLater < init) {
      airclaimStatus = "Pending"
    } else {
      airclaimStatus = "Running"
    }

    let iterationsec = parseInt(this.getParameterFromTable('iterationsec', this.parametersTable, 3600),10);
    let surveystart = parseInt(this.getParameterFromTable('surveystart', this.parametersTable, 3600),10);
    let surveyend = parseInt(this.getParameterFromTable('surveyend', this.parametersTable, 3600),10);
    let votestart = parseInt(this.getParameterFromTable('votestart', this.parametersTable, 3600),10);
    let voteend = parseInt(this.getParameterFromTable('voteend', this.parametersTable, 3600),10);
    let ratifystart = parseInt(this.getParameterFromTable('ratifystart', this.parametersTable, 3600),10);
    let ratifyend = parseInt(this.getParameterFromTable('ratifyend', this.parametersTable, 3600),10);

    // Calculate time elapsed
    let elapsed_seconds = (now / 1000) - (init / 1000)
    // Get current iteration
    let currentIteration = Math.floor( (elapsed_seconds / iterationsec) + 1 )
    let nextIteration = currentIteration + 1

    let elapsedFromIteration = elapsed_seconds % iterationsec;
    let nextClaimIn = iterationsec - elapsedFromIteration

    // Set active period
    let surveyPeriodActive = elapsedFromIteration >= surveystart && elapsedFromIteration <= surveyend ? true : false;
    let votePeriodActive =  elapsedFromIteration >= votestart && elapsedFromIteration <= voteend ? true : false;
    let ratifyPeriodActive = elapsedFromIteration >= ratifystart && elapsedFromIteration <= ratifyend ? true : false;

    return {
      surveyPeriodActive: surveyPeriodActive,
      voteStartsIn: votestart - elapsedFromIteration,
      voteClosesIn: voteend - elapsedFromIteration,
      votePeriodActive: votePeriodActive,
      surveyClosesIn:  surveyend - elapsedFromIteration,
      ratifyStartsIn: ratifystart - elapsedFromIteration,
      ratifyClosesIn: ratifyend - elapsedFromIteration,
      ratificationStartsIn: ratifystart - elapsedFromIteration,
      ratifyPeriodActive: ratifyPeriodActive,
      current: currentIteration,
      next: nextIteration,
      nextClaimIn: nextClaimIn,
      airclaimStatus: airclaimStatus
    }
  }

  /**
   * Helper function to capitalise a string
   */
   capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }

  /**
   * Filters balances retrived from contract tables
   */
  filterBalances(user){
    // iterate over user
    for (let [key, value] of Object.entries(user)) {
      // only get valid balances
      if(key.includes('Balance')){

        // make sure it isn't null
        if (value){
          let balance = parseFloat(value.balance.split(' ')[0]);
          user[key] = balance;
        }
        // if null
        else{
          let zero = 0
          user[key] = zero
        }
        
      }
    }

    return user
  }

  /**
   * Check if user is eligible to claim
   */
  checkEligibleToClaim(currentIteration, svrsTable, userRecord, rewardsTable){

    // if first iteration then return
    if(currentIteration == 1){
      console.warn('eligibleToClaim', 'not eligible due to first iteration')
      return false
    }

    // if any tables null, then not eligible
    if(svrsTable == null || userRecord == null || rewardsTable == null){
      console.warn('eligibleToClaim', 'not eligible due to empty tables')
      return false
    }

    // get all iterations user participated in
    // which are higher than the last claimed iteration
    let iterationsParticipated = []
    for(let [key, row] of Object.entries(svrsTable)){
      if(row > userRecord.last_claim){
        iterationsParticipated.push(row)
      }
    }

    // iterate over participated iterations
    // check if vote has been ratified
    let eligible = false

    for(let iteration of iterationsParticipated){

      let filteredRewards = []
      if(rewardsTable.length){
        filteredRewards = rewardsTable.filter((row)=>{
          return row.iteration == iteration && row.ratified == 1
        })
      } else if( "iteration" in rewardsTable){
        if(rewardsTable.iteration == iteration && rewardsTable.ratified){
          filteredRewards.push(rewardsTable)
        }
      }

      if(filteredRewards.length){
        console.warn('eligibleToClaim: rewards found', filteredRewards)
        eligible = true;
        break;
      }

    }

    return eligible

  }
}
