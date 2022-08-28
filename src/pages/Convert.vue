<template>
  <div>
    <CompleteDialog ref="complete" />



    <div class="panel-wrap panel bg-white" v-if="isFreeosEnabled">
      <h4 class="q-mb-lg q-mt-lg text-center">Mint or Convert Options</h4>

      <div class="flex justify-center" style="flex-direction:row;">
        <q-btn class="tab-btn" v-bind:class="{ 'tab-btn--unselected': !isMintTabSelected }" outline unelevated no-caps
          @click="isMintTabSelected = !isMintTabSelected">Mint FREEOS</q-btn>
        <q-btn class="tab-btn" v-bind:class="{ 'tab-btn--unselected': isMintTabSelected }" outline unelevated no-caps
          @click="isMintTabSelected = !isMintTabSelected">Points to FREEBI</q-btn>
      </div>

      <!--MINT FREEOS-->
      <section v-if="isMintTabSelected">
          <p class="bg-primary text-h5 text-center text-white q-py-md">
            This could be a taxable event in your jurisdiction
          </p>
          <p class="q-py-md q-px-lg">When Minting FREEOS a Mint Fee is charged which is a key component of the FREEOS
            economic engine to keep the value buoyant. The Mint Fee applies when you convert your ‘Claimed Points’ or FREEBI
            into a tradable token (FREEOS). Only FREEBI and Points are exempt. The Fee will be stewarded by your VOTE when
            it comes available. Minting may be a taxable event. FREEOS is our key trading token in crypto-markets like
            Alcor, and FREEBI is our internal trading token within the community. More info <a target="_blank" title="Minting FREEOS" href="https://docs.freeos.io/d/h/6k0z3-408/43bbcca7c54387a/6k0z3-1562"> click here</a></p>


          <section class="q-ma-md panel">
            <div class="text-primary text-subtitle1 text-bold text-center q-pa-sm">Your current balances:</div>
            <div class="balance-list">
              <div class="q-mb-sm q-mr-xs q-ml-xs bg-info text-center">
                <div class="text-bold text-subtitle1 font-bold" style="line-height:1;"><AbbreviateNumber :value="user.pointBalance" /></div>
                <div class="text-bold text-primary">POINTS</div>
              </div>
              <div class="q-mb-sm q-mr-xs q-ml-xs bg-info text-center">
                <div class="text-bold text-subtitle1 font-bold" style="line-height:1;"><AbbreviateNumber :value="user.freebiBalance" /></div>
                <div class="text-bold text-primary">FREEBI</div>
              </div>
              <div class="q-mb-sm q-mr-xs q-ml-xs bg-info text-center">
                <div class="text-bold text-subtitle1 font-bold" style="line-height:1;"><AbbreviateNumber :value="user.freeosBalance" /></div>
                <div class="text-bold text-primary">FREEOS</div>
              </div>
              <div class="q-mb-sm q-mr-xs q-ml-xs bg-info text-center">
                <div class="text-bold text-subtitle1 font-bold" style="line-height:1;"><AbbreviateNumber :value="user.XPRBalance" /></div>
                <div class="text-bold text-primary">XPR</div>
              </div>

            </div>
            <hr />
            <div class="text-primary text-subtitle1 text-bold text-center q-pa-sm" v-if="user.mffBalance > 0">Mint Free Points balance:</div>

            <div class="balance-list" v-if="user.mffBalance > 0">
              <div class="q-mb-sm q-mr-xs q-ml-xs bg-info text-center">
                <div class="text-bold text-subtitle1 font-bold" style="line-height:1;"><AbbreviateNumber :value="user.mffBalance" /></div>
                <div class="text-bold text-primary">of your POINTS</div>
              </div>
            </div>
          </section>

          <section class="q-ma-md panel">
            <div class="q-mt-sm text-primary text-subtitle1 text-bold text-center v q-pb-none">Mint Fee Details:</div>
            <div class="text-h5 text-center q-mt-none q-pt-none"><AbbreviateNumber :value="rewardsPrevious['mint_fee_percent']" />%</div>
            <!--<div class="bg-primary text-sm text-center text-white q-py-sm q-mt-sm">*Note there is NO Mint Fee for Converting To FREEBI</div>-->
            <div class="bg-info text-center">
              <div class="text-primary text-bold q-pt-sm q-pb-none">Minimum Mint Fee</div>
              <div class="text-subtitle1 q-mt-none q-pt-xs"><strong><AbbreviateNumber :value="mintFeeMin" /> FREEOS</strong></div>
              <div class="text-subtitle1 q-mt-none q-pt-xs"><small class="q-pr-sm">or</small><strong>{{xprMinMintfee | roundTo4Decimal}} XPR</strong></div>
              <div class="text-subtitle1 q-mt-none q-pt-xs q-pb-md"><small class="q-pr-sm">or</small><strong>{{usdMinMintfee | roundTo6Decimal}} XUSDC</strong></div>
            </div>
          </section>


          <section class="q-ma-md panel">
            <div class="text-primary text-subtitle1 text-bold text-center q-pa-sm">Create a MINT Transaction</div>


            <div class="bg-info q-pa-md">


              <div class="row justify-center q-mb-sm q-pb-xs">
                <div class="col-xs-5 col-sm-6">
                  <div class="q-mt-xs" style="line-height:1;"><small class="text-bold">1. Choose a balance to Mint
                      from:</small></div>
                </div>
                <div class="col-xs-6 col-sm-6">

                  <q-select label="Select" option-value="value" option-label="label" option-disable="disabled" emit-value required dense outlined v-model="submitData.from" :options="balOptions" />

                  <!-- <p class="q-mb-none text-grey" v-if="submitData.token === stakeCurrency"><small>{{ XPRBalance }}
                      {{ stakeCurrency }} available to transfer</small></p>
                  <p class="q-mb-none text-grey" v-if="submitData.token === currencyName"><small>{{ liquidFreeos }}
                      {{ currencyName }} available to transfer</small></p>-->
                </div>
              </div>


              <div v-if="submitData.from === 'POINT'" class="row justify-center q-mb-md q-pb-xs">
                <div class="col-xs-5 col-sm-6">
                  <p class="q-mt-none q-mb-none"><small class="text-bold text-primary">Your Available Points Balance:</small>
                  </p>
                </div>
                <div class="col-xs-6 col-sm-6">
                  <p class="q-mt-none q-mb-none text-primary text-bold">{{ user.pointBalance }}</p>
                </div>
              </div>

              <div v-if="submitData.from === 'FREEBI'" class="row justify-center q-mb-md q-pb-xs">
                <div class="col-xs-5 col-sm-6">
                  <p class="q-mt-none q-mb-none"><small class="text-bold text-primary">Your Available FREEBI Balance:</small>
                  </p>
                </div>
                <div class="col-xs-6 col-sm-6">
                  <p class="q-mt-none q-mb-none text-primary text-bold">{{user.freebiBalance}}</p>
                </div>
              </div>

              <div class="row justify-center q-mb-sm q-pb-xs">
                <div class="col-xs-5 col-sm-6">
                  <div class="q-mt-xs" style="line-height:1;"><small class="text-bold">2. Amount to
                      Mint:</small><br/><small style="font-style:italic">from account '{{this.accountName}}'</small></div>
                </div>
                <div class="col-xs-6 col-sm-6">
                  <label data-v-052b630f="" for="f_8b8778e2-d74d-4d9f-8e69-cd43d21fcac5"
                    class="q-field row no-wrap items-start q-input q-field--outlined q-field--dense q-validation-component">
                    <div class="q-field__inner relative-position col self-stretch">
                      <div tabindex="-1" class="q-field__control relative-position row no-wrap">
                        <div class="q-field__control-container col relative-position row no-wrap q-anchor--skip"><input
                            v-model="submitData.quantity" tabindex="0" required="required"
                            id="f_8b8778e2-d74d-4d9f-8e69-cd43d21fcac5" type="number" class="q-field__native q-placeholder">
                          <q-btn :disabled="!submitData.from" class="max-btn" size="sm" unelevated no-caps color="secondary" @click="setMintMaxAmount()">Max
                          </q-btn>

                        </div>
                      </div>
                    </div>
                  </label>

                  <!-- <p class="q-mb-none text-grey" v-if="submitData.token === stakeCurrency"><small>{{ XPRBalance }}
                      {{ stakeCurrency }} available to transfer</small></p>
                  <p class="q-mb-none text-grey" v-if="submitData.token === currencyName"><small>{{ liquidFreeos }}
                      {{ currencyName }} available to transfer</small></p>-->
                </div>
              </div>
              <div class="row justify-center q-mb-sm q-pb-xs">
                <div class="col-xs-5 col-sm-6">
                  <div class="q-mt-xs" style="line-height:1;"><small class="text-bold">3. Pay the Mint Fee with:</small>
                  </div>
                </div>
                <div class="col-xs-6 col-sm-6">
                  <q-select label="Select" option-value="value" option-label="label" option-disable="disabled" emit-value required dense outlined v-model="submitData.pay" :options="mintFeeOptions" />

                  <!-- <p class="q-mb-none text-grey" v-if="submitData.token === stakeCurrency"><small>{{ XPRBalance }}
                      {{ stakeCurrency }} available to transfer</small></p>
                  <p class="q-mb-none text-grey" v-if="submitData.token === currencyName"><small>{{ liquidFreeos }}
                      {{ currencyName }} available to transfer</small></p>-->
                </div>
              </div>
              <hr />
              <div v-if="submitData.from && submitData.pay && submitData.quantity > 0 && submitData.quantity <= mintMaxAmount">

                <div class="q-mt-md text-primary text-bold"><small>Transaction Mint Fee Charge:</small></div>
                <div class="row justify-center">
                  <div class="col-xs-5 col-sm-6">
                    <p class="q-mt-xs q-mb-none"><small class="text-bold">Total Mint Fee will be:</small>
                    </p>
                  </div>
                  <div class="col-xs-6 col-sm-6" v-if="submitData.pay !== 'XUSDC'">
                    <p class="q-mt-xs q-mb-none text-bold">{{ finalMintFeeFreeos | roundTo4Decimal }} {{submitData.pay}}</p>
                  </div>
                  <div class="col-xs-6 col-sm-6" v-if="submitData.pay === 'XUSDC'">
                    <p class="q-mt-xs q-mb-none text-bold">{{ finalMintFeeFreeos | roundTo6Decimal }} {{submitData.pay}}</p>
                  </div>
                </div>
                <div class="row justify-center" v-if="user.mffBalance > 0">
                  <div class="col-xs-5 col-sm-6">
                    <p class="q-mt-xs q-mb-none"><small class="text-bold">Mint Fee FREE Points used:</small>
                    </p>
                  </div>
                  <div class="col-xs-6 col-sm-6">
                    <p class="q-mt-xs q-mb-none text-bold">{{ mintFeeFreePointsUsed | roundTo4Decimal }} Points</p>
                  </div>
                </div>
                <div class="row justify-center" v-if="user.mffBalance > 0">
                  <div class="col-xs-5 col-sm-6">
                    <p class="q-mt-xs q-mb-none"><small class="text-bold">Mint Fee balance to charge:</small>
                    </p>
                  </div>
                  <div class="col-xs-6 col-sm-6">
                    <p class="q-mt-xs q-mb-none text-bold">{{ user.mffBalance   | roundTo4Decimal}} Points</p>
                  </div>
                </div>


                <div class="q-mt-md text-primary text-bold"><small>Expected Transaction Balances:</small></div>


                <div class="row justify-center" v-if="submitData.from === 'POINT'">
                  <div class="col-xs-5 col-sm-6">
                    <p class="q-mt-xs q-mb-none"><small class="text-bold">Points balance:</small>
                    </p>
                  </div>
                  <div class="col-xs-6 col-sm-6">
                    <p class="q-mt-xs q-mb-none text-bold">{{(user.pointBalance - parseFloat(submitData.quantity)) | roundTo4Decimal }} Points</p>
                  </div>
                </div>

                <div class="row justify-center" v-if="submitData.from === 'FREEBI'">
                  <div class="col-xs-5 col-sm-6">
                    <p class="q-mt-xs q-mb-none"><small class="text-bold">FREEBI balance:</small>
                    </p>
                  </div>
                  <div class="col-xs-6 col-sm-6">
                    <p class="q-mt-xs q-mb-none text-bold">{{(user.freebiBalance - parseFloat(submitData.quantity)) | roundTo4Decimal }} FREEBI</p>
                  </div>
                </div>


                <div class="row justify-center" v-if="user.mffBalance > 0">
                  <div class="col-xs-5 col-sm-6">
                    <p class="q-mt-xs q-mb-none"><small class="text-bold">Mint Fee FREE Points balance:</small>
                    </p>
                  </div>
                  <div class="col-xs-6 col-sm-6">
                    <p class="q-mt-xs q-mb-none text-bold">{{parseFloat(user.mffBalance - mintFeeFreePointsUsed) | roundTo4Decimal}} Points</p>
                  </div>
                </div>


                <div class="row justify-center">
                  <div class="col-xs-5 col-sm-6">
                    <p class="q-mt-xs q-mb-none"><small class="text-bold">FREEOS Balance:</small>
                    </p>
                  </div>
                  <div class="col-xs-6 col-sm-6">
                    <p class="q-mt-xs q-mb-none text-bold" v-bind:class="{ 'text-negative': freeosBalance < 0 }" text-negative>{{freeosBalance | roundTo4Decimal}} FREEOS</p>
                  </div>
                </div>


              </div>
              
              <div style="align-items: center;" class="row justify-center q-mt-lg ">
                <q-btn @click="mintSubmit()" class="full-width" :disabled="freeosBalance < 0 || !submitData.from || !submitData.pay || !(submitData.quantity > 0 && submitData.quantity <= mintMaxAmount)" size="xl" unelevated no-caps color="primary">
                  Mint FREEOS</q-btn>
              </div>
            </div>
          </section>
      </section>










      <!--POINT TO FREEBI-->
      <section v-if="!isMintTabSelected">
      <p class="bg-primary text-h5 text-center text-white q-py-md">
        Converting Points to FREEBI
      </p>
      <p class="q-py-md q-px-lg">FREEBI is our internal trading token within the community and isn't subject to a Mint
        Fee. The FREEBI tokens exist as a way for participants to have a limited, but tradable, token that can be used
        for Peer-to-Peer activities, while protecting the FREEOS token's circulating supply. More info <a
          href="https://docs.freeos.io/d/h/6k0z3-408/43bbcca7c54387a/6k0z3-1582" target="_blank">click
          here</a></p>


      <section class="q-ma-md panel">
        <div class="text-primary text-subtitle1 text-bold text-center q-pa-sm">Your current balances:</div>
        <div class="balance-list">
          <div class="q-mb-sm q-mr-xs q-ml-xs bg-info text-center">
            <div class="text-bold text-subtitle1 font-bold" style="line-height:1;"><AbbreviateNumber :value="user.pointBalance" /></div>
            <div class="text-bold text-primary">POINTS</div>
          </div>
          <div class="q-mb-sm q-mr-xs q-ml-xs bg-info text-center">
            <div class="text-bold text-subtitle1 font-bold" style="line-height:1;"><AbbreviateNumber :value="user.freebiBalance" /></div>
            <div class="text-bold text-primary">FREEBI</div>
          </div>
          <div class="q-mb-sm q-mr-xs q-ml-xs bg-info text-center">
            <div class="text-bold text-subtitle1 font-bold" style="line-height:1;"><AbbreviateNumber :value="user.freeosBalance" /></div>
            <div class="text-bold text-primary">FREEOS</div>
          </div>
        </div>

      </section>

      <section class="q-ma-md panel">
        <div class="text-primary text-subtitle1 text-bold text-center q-pa-sm">Convert Your Points to FREEBI</div>


        <div class="bg-info q-pa-md">
          <div class="row justify-center q-mb-sm q-pb-xs">
            <div class="col-xs-5 col-sm-6">
              <p class="q-mt-sm q-mb-none"><small class="text-bold text-primary">Your Available Points Balance:</small>
              </p>
            </div>
            <div class="col-xs-6 col-sm-6">
              <p class="q-mt-sm q-mb-none text-primary text-bold">{{ user.pointBalance }}</p>
            </div>
          </div>
          <div class="row justify-center q-mb-sm q-pb-xs">
            <div class="col-xs-5 col-sm-6">
              <div class="q-mt-xs" style="line-height:1;"><small class="text-bold">Amount to Convert:</small><br/><small style="font-style:italic">from account '{{this.accountName}}'</small></div>
            </div>
            <div class="col-xs-6 col-sm-6">



              <label data-v-052b630f="" for="f_8b8778e2-d74d-4d9f-8e69-cd43d21fcac5"
                class="q-field row no-wrap items-start q-input q-field--outlined q-field--dense q-validation-component">
                <div class="q-field__inner relative-position col self-stretch">
                  <div tabindex="-1" class="q-field__control relative-position row no-wrap">
                    <div class="q-field__control-container col relative-position row no-wrap q-anchor--skip"><input
                        v-model="sendAmount" tabindex="0" required="required"
                        id="f_8b8778e2-d74d-4d9f-8e69-cd43d21fcac5" type="number" class="q-field__native q-placeholder">
                      <q-btn class="max-btn" size="sm" unelevated no-caps color="secondary" @click="freebiMaxAmount()">Max
                      </q-btn>

                    </div>
                  </div>
                </div>
              </label>

              <!-- <p class="q-mb-none text-grey" v-if="submitData.token === stakeCurrency"><small>{{ XPRBalance }}
                  {{ stakeCurrency }} available to transfer</small></p>
              <p class="q-mb-none text-grey" v-if="submitData.token === currencyName"><small>{{ liquidFreeos }}
                  {{ currencyName }} available to transfer</small></p>-->
            </div>
          </div>
          <hr />
          <div v-if="sendAmount">
            <div class="q-mt-md text-primary text-bold"><small>Expected conversion transaction balances will show
                here</small></div>

                  <div class="row justify-center">
                    <div class="col-xs-5 col-sm-6">
                      <p class="q-mt-xs q-mb-none"><small class="text-bold">POINTS balance will be:</small>
                      </p>
                    </div>
                    <div class="col-xs-6 col-sm-6">
                      <p class="q-mt-xs q-mb-none text-bold">{{(parseFloat(user.pointBalance) - parseFloat(sendAmount)) | roundTo4Decimal}}</p>
                    </div>
                  </div>


                  <div class="row justify-center">
                    <div class="col-xs-5 col-sm-6">
                      <p class="q-mt-xs q-mb-none"><small class="text-bold">FREEBI balance will be:</small>
                      </p>
                    </div>
                    <div class="col-xs-6 col-sm-6">
                      <p class="q-mt-xs q-mb-none text-bold">{{(parseFloat(user.freebiBalance) + parseFloat(sendAmount)) | roundTo4Decimal}}</p>
                    </div>
                  </div>
        </div>
          <div style="align-items: center;" class="row justify-center q-mt-lg ">
            <q-btn @click="submit()" :disabled="!(parseFloat(sendAmount) > 0) || parseFloat(sendAmount) > parseFloat(user.pointBalance)" class="full-width" size="xl" unelevated no-caps :disable="false" color="primary">
              Convert to FREEBI</q-btn>
          </div>
        </div>
      </section>
    </section>

    </div>

  </div>
</template>

<script>
import {
  mapState,
  mapActions,
  mapGetters
} from 'vuex'
import {
  getAbsoluteAmount
} from '@/utils/currency'
import CompleteDialog from 'src/components/CompleteDialog.vue'
import AbbreviateNumber from 'src/components/AbbreviateNumber.vue'
import { user } from 'src/store/freeos/getters'
import { AST_Return } from 'terser'




export default {
  name: 'Convert',
  components: {
    CompleteDialog,
    AbbreviateNumber
  },
  data() {
    return {
      isMintTabSelected: true,
      submitData: {
        pay: null,
        quantity: 0,
        from: null
      },
      balOptions: [],
      mintFeeOptions: [],
      isMintTab: true,
      sendAmount: 0,
      tokenCurrencyName: this.$options.filters.capitalize(process.env.TOKEN_CURRENCY_NAME),
      stakeCurrency: process.env.STAKING_CURRENCY,
      currencyName: process.env.CURRENCY_NAME,
      convertWatch: false
    }
  },
  computed: {
    mintfeePayable() {//mintfee_payable
      var result = 0;
      const qty = parseFloat(this.submitData.quantity);
      if(this.user['mffBalance'] >= qty){
      }else{
        result = qty - this.user['mffBalance'];
      }
      return result;
    },
    mintFeeInFreeos() {//mintfee_in_freeos
      return this.mintfeePayable * (parseFloat(this.rewardsPrevious['mint_fee_percent']) / 100);
    },
    finalMintFeeFreeos() {//final_mintfee_in_freeos & minfee
        var final_mintfee_in_freeos = 0;

        if(this.mintFeeInFreeos < this.mintFeeMin){
          final_mintfee_in_freeos = this.mintFeeMin;
        }else{
          final_mintfee_in_freeos = this.mintFeeInFreeos;
        }

        if(this.submitData.pay === 'FREEOS'){
          return final_mintfee_in_freeos;
        }else if(this.submitData.pay === 'XPR'){
          return final_mintfee_in_freeos * ( parseFloat(this.freeosContract['usdrate']) / parseFloat(this.xprContract['usdrate']) )
        }else if(this.submitData.pay === 'XUSDC'){
          return final_mintfee_in_freeos * ( parseFloat(this.freeosContract['usdrate']) / parseFloat(this.usdContract['usdrate']) )
        }
    },
    xprMinMintfee() {
      var result = 0;
      if(this.mintFeeMin && this.xprContract && this.freeosContract['usdrate']){
        result = this.mintFeeMin * ( parseFloat(this.freeosContract['usdrate']) / parseFloat(this.xprContract['usdrate']) )
      }
      return result;
    },
    usdMinMintfee() {
      var result = 0;
      if(this.mintFeeMin && this.usdContract && this.freeosContract['usdrate']){
        result = this.mintFeeMin * ( parseFloat(this.freeosContract['usdrate']) / parseFloat(this.usdContract['usdrate']) )
      }
      return result;
    },
    mintFeeFreePointsUsed() {
      const qty = parseFloat(this.submitData.quantity);
      if(qty >= this.user['mffBalance']){
        return this.user['mffBalance'];
      }else{
        return qty;
      }
    },
    mintMaxAmount() {
      if (this.submitData.from === 'POINT') {
        return this.user.pointBalance
      }else if(this.submitData.from === 'FREEBI'){
        return this.user.freebiBalance
      }else{
        return 0;
      }
    },
    freeosBalance() {
      const qty = parseFloat(this.submitData.quantity);

      if(this.submitData.pay === 'FREEOS'){
        return this.user.freeosBalance + qty - this.finalMintFeeFreeos;
      }else if(this.submitData.pay === 'XPR' || this.submitData.pay === 'XUSDC'){
        return this.user.freeosBalance + qty;
      }else{
        return 0;
      }
    },
    ...mapGetters('freeos', [
      'isFreeosEnabled',
      'isVerified',
      'user',
      'accountType',
      'nextClaimIn',
      'currentIteration',
      'eligibleToClaim',
      'nextActivity',
      'accountName',
      'mintFeeMin', 
      'rewardsPrevious', 
      'dparametersTable',
      'xprContract',
      'usdContract',
      'freeosContract'
    ])
  },
  methods: {
    ...mapActions('freeos', ['mintFreeBI','mintFreeos']),
    setMintMaxAmount(){
        this.submitData.quantity = this.mintMaxAmount;
    },
    checkIfDisabled(val){
      if(val){
        return false;
      }
      return true
    },
    freebiMaxAmount() {
      if (this.user.pointBalance) {
        this.sendAmount = this.user.pointBalance
      }
    },
    async submit() {
      this.convertWatch = true
      var result = await this.mintFreeBI({ owner: this.accountName, quantity: `${parseFloat(this.sendAmount).toFixed(process.env.TOKEN_PRECISION)} ${process.env.TOKEN_CURRENCY_NAME}` })

      if (!(result instanceof Error)) {
        this.$refs.complete.openDialog({
          title: "Woohoo!", subtitle: "You Converted", value: this.sendAmount, currency: 'FREEBI'
        });
      }

      console.log('resultR', result)
      this.convertWatch = false
      this.resetForm()
    },
    async mintSubmit() {
      this.convertWatch = true
      var qty = parseFloat(this.submitData.quantity);

      var transactionArray = [];

      if(this.submitData.from === 'FREEBI'){
          //Transfer FREEBI
            var dataToSubmit = {};
            dataToSubmit.from = this.accountName;
            dataToSubmit.quantity = `${qty.toFixed(process.env.TOKEN_PRECISION)} ${this.submitData.from}`
            dataToSubmit.memo = 'freeos mint credit';
            dataToSubmit.to = process.env.FREEOSGOV_CONTRACT;
            dataToSubmit.contract = process.env.FREEBITOKENS_CONTRACT;


            transactionArray.push(dataToSubmit);
            //var result = await this.transfer(dataToSubmit, accountContract);
      }

      if(this.finalMintFeeFreeos){
            //pay Mint fee
            var dataToSubmit = {};
            dataToSubmit.from = this.accountName;

            dataToSubmit.memo = 'freeos mint fee';
            //dataToSubmit.memo =  this.mintFeeInFreeos + " " + this.submitData.pay;
            dataToSubmit.to = process.env.FREEOSGOV_CONTRACT;


            console.log('mintFeeInFreeos', this.mintFeeInFreeos)


            if(this.submitData.pay === 'FREEOS'){
              dataToSubmit.contract = this.freeosContract['contract'];
              dataToSubmit.quantity = `${parseFloat(this.finalMintFeeFreeos).toFixed(process.env.TOKEN_PRECISION)} ${this.submitData.pay}`;
            }else if(this.submitData.pay === 'XPR'){
              dataToSubmit.contract  = this.xprContract['contract'];
              dataToSubmit.quantity = `${parseFloat(this.finalMintFeeFreeos).toFixed(process.env.TOKEN_PRECISION)} ${this.submitData.pay}`;
            }else if(this.submitData.pay === 'XUSDC'){
              dataToSubmit.contract  = this.usdContract['contract'];
              dataToSubmit.quantity = `${parseFloat(this.finalMintFeeFreeos).toFixed(6)} ${this.submitData.pay}`;
            }
            transactionArray.push(dataToSubmit);
            //var result = await this.transfer(dataToSubmit, accountContract);
      }

      console.log()
      var dataToSubmit = {};
      dataToSubmit.user = this.accountName;
      dataToSubmit.input_quantity = `${qty.toFixed(process.env.TOKEN_PRECISION)} ${this.submitData.from}`;

      if(this.submitData.pay === 'FREEOS'){
          dataToSubmit.mint_fee_currency = '4,' + this.submitData.pay;
      }else if(this.submitData.pay === 'XPR'){
          dataToSubmit.mint_fee_currency = '4,' + this.submitData.pay;
      }else if(this.submitData.pay === 'XUSDC'){
          dataToSubmit.mint_fee_currency = '6,' + this.submitData.pay;
      }
      dataToSubmit.contract = process.env.FREEOSGOV_CONTRACT;
      transactionArray.push(dataToSubmit);


      var result = await this.mintFreeos(transactionArray);




      if (!(result instanceof Error)) {
        this.$refs.complete.openDialog({
          title: "Woohoo!", subtitle: "You Converted", value: qty, currency: 'FREEOS'
        });
      }

      console.log('resultR', result)
      this.convertWatch = false
      this.resetForm()
    },

    resetForm() {
      this.sendAmount = 0
    }
  },
  created(){
        this.balOptions = [
        {
          label: 'Points',
          value: 'POINT',
          disabled: this.checkIfDisabled(this.user.pointBalance)
        },
        {
          label: 'FREEBI',
          value: 'FREEBI',
          disabled: this.checkIfDisabled(this.user.freebiBalance)
        }
      ]
      this.mintFeeOptions = [
        {
          label: 'FREEOS',
          value: 'FREEOS',
          disabled: this.checkIfDisabled(this.user.freeosBalance)
        },
        {
          label: 'XPR',
          value: 'XPR',
          disabled: this.checkIfDisabled(this.user.XPRBalance)
        },
        {
          label: 'XUSDC',
          value: 'XUSDC',
          disabled: this.checkIfDisabled(this.user.XUSDCBalance)
        }
      ]
  }

}
</script>

<style scoped>
.balance-list {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
}

.balance-list>* {
  flex: 0 0 46%;
  max-width: 46%;
  padding: 8px;
  border-radius: 8px;
}
</style>
