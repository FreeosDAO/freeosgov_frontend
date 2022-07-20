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

      console.log('Wallet session restored', auth)

      this.setWalletUser({
        accountName: (auth ? auth.actor : null),
        walletId: ProtonSDK && ProtonSDK.link ? ProtonSDK.link.walletType : null
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
      this.actionFetch()
    } finally {
      this.start()
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
     * Get Contract Tables
     */

    let tableNames = ['parameters', 'dparameters', 'system']
    let tables = await Promise.all(tableNames.map(async table => {
      return await this.getRecord(process.env.FREEOSGOV_CONTRACT, table, null, {limit: 100})
    }));

    [this.parametersTable, this.dparametersTable, this.systemRow] = tables;

    // add to output
    output['parametersTable'] = this.parametersTable
    output['dparametersTable'] = this.dparametersTable
    output['systemRow'] = this.systemRow

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
        {contract: process.env.FREEOSGOV_CONTRACT, table: 'accounts', scope: user.name, params: {limit: 1, lower_bound: 'POINT', upper_bound: 'POINT'}},
        {contract: process.env.FREEOSGOV_CONTRACT, table: 'vestaccounts', scope: user.name, params: {limit: 1, lower_bound: 'POINT', upper_bound: 'POINT'}},
        {contract: process.env.FREEOSGOV_CONTRACT, table: 'accounts', scope: user.name, params: {limit: 1, lower_bound: 'FREEOS', upper_bound: 'FREEOS'}},
        {contract: 'eosio.token', table: 'accounts', scope: user.name, params: {limit: 1, lower_bound: 'XPR', upper_bound: 'XPR'}},
        {contract: 'xtokens', table: 'accounts', scope: user.name, params: {limit: 1, lower_bound: 'XUSDC', upper_bound: 'XUSDC'}},
        {contract: kycContract, table: 'usersinfo', scope: kycContract, params: {limit: 1, upper_bound: this.walletUser.accountName, lower_bound: this.walletUser.accountName}},
      ]


      let userVars = await Promise.all(userQueries.map(async query => {
        return await this.getRecord(query.contract, query.table, query.scope, query.params)
      }));
      
      [ user['record'], user['pointBalance'], user['lockedBalance'], user['freeosBalance'], user['XPRBalance'], user['XUSDCBalance'], user['preRegistration']  ] = userVars

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
      output['isVerified'] = accountType === 'v' || accountType === 'b' || accountType === 'c' ? true : false;



      //Survey Results
      output['voteCompleted'] = false;
      output['surveyCompleted'] = false;
      output['ratifyCompleted'] = false;
      const svrsTable = await this.getUserRecord(process.env.FREEOSGOV_CONTRACT, 'svrs', {limit: 1});
      console.log('current', iterations.current)
      console.log('svrsTable', svrsTable)
      for (const item in svrsTable) {
        if(svrsTable[item]===iterations.current){
          if(item.indexOf("vote") >= 0) output['voteCompleted'] = true;
          if(item.indexOf("ratify") >= 0) output['ratifyCompleted'] = true;
          if(item.indexOf("survey") >= 0) output['surveyCompleted'] = true;
        }
      } 
    }

    /**
     * Exchange Rate Vars
     */
     const exchangeRate = await this.getRecord(process.env.FREEOSGOV_CONTRACT, 'exchangerate');
     output['currentPrice'] = exchangeRate && exchangeRate.currentprice ? (exchangeRate.currentprice / 1).toFixed(6) : 0;
     output['targetPrice'] = exchangeRate && exchangeRate.targetprice ? (exchangeRate.targetprice / 1).toFixed(6) : 0;

    /**
     * Survey Vars
     */

    //dparametersTable vars
    output['surveyShare'] =  parseFloat(this.getParameterFromTable('surveyshare', this.dparametersTable, ''),10).toFixed(2) * 100;
    output['voteShare'] =  parseFloat(this.getParameterFromTable('voteshare', this.dparametersTable, ''),10).toFixed(2) * 100;
    output['ratifyShare'] =  parseFloat(this.getParameterFromTable('ratifyshare', this.dparametersTable, ''),10).toFixed(2) * 100;
    output['lockFactor'] =  parseFloat(this.getParameterFromTable('lockfactor', this.dparametersTable, ''),10).toFixed(2);



    /* Vars calculated via Iterations */
    output['voteClosesIn'] = iterations['voteClosesIn'];
    output['surveyClosesIn'] = iterations['surveyClosesIn'];
    output['voteStartsIn'] = iterations['voteStartsIn'];
    output['surveyPeriodActive'] = iterations['surveyPeriodActive'];
    output['votePeriodActive'] = iterations['votePeriodActive'];
    output['ratifyStartsIn'] = iterations['ratifyStartsIn'];
    output['ratifyPeriodActive'] = iterations['ratifyPeriodActive'];
    output['ratifyClosesIn'] = iterations['ratifyClosesIn'];
    

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
          permission: 'active'
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
    /* TO DO */
    return this.sendTransaction(process.env.FREEOSGOV_CONTRACT, 'reguser')
  }

  async reregister() {
    /* TO DO */
    return this.sendTransaction(process.env.FREEOSGOV_CONTRACT, 'reregister')
  }

  async convertOptions(sendData) {
    /* TO DO */
    //let cronacle = await this.setupCronacle()
    //return this.sendTransaction(process.env.FREEOSGOV_CONTRACT, 'convert', sendData, cronacle)
  }

  async claim() {
    /* TO DO */
    //let cronacle = await this.setupCronacle()
    //return this.sendTransaction(process.env.FREEOSGOV_CONTRACT, 'claim', false, cronacle)
  }

  async transfer(sendData) {
    /* TO DO */
    /*
    var contract = process.env.FREEOSTOKENS_CONTRACT
    if (sendData.token === process.env.STAKING_CURRENCY) {
      contract = process.env.STAKING_CURRENCY_CONTRACT
    }
    delete sendData.token
    return this.sendTransaction(contract, 'transfer', sendData)*/
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
    let init = new Date(this.systemRow.init);
    var date = new Date(); //Current timestamp
    date = date.toUTCString(); //Convert to UTC/GMT
    date = new Date(date); //will convert to present timestamp offset
    var now = (new Date().getTime()) + (date.getTimezoneOffset() * 60 * 1000);  //GET UTC TimeZone Offset and add to Current Local Timestamp


    //let now = new Date(new Date().toUTCString()).getTime()
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
    return {
      surveyPeriodActive: elapsedFromIteration >= surveystart && elapsedFromIteration <= surveyend ? true : false,
      voteStartsIn: votestart - elapsedFromIteration,
      voteClosesIn: voteend - elapsedFromIteration,
      votePeriodActive: elapsedFromIteration >= votestart && elapsedFromIteration <= voteend ? true : false,
      surveyClosesIn:  surveyend - elapsedFromIteration,
      ratifyStartsIn: ratifystart - elapsedFromIteration,
      ratifyClosesIn: ratifyend - elapsedFromIteration,
      ratificationStartsIn: ratifystart - elapsedFromIteration,
      ratifyPeriodActive: elapsedFromIteration >= ratifystart && elapsedFromIteration <= ratifyend ? true : false,
      current: currentIteration,
      next: nextIteration
    }
  }

  /**
   * Helper function to capitalise a string
   */
   capitalize(string){
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
  }

}
