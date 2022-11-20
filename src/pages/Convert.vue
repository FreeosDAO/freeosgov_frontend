<template>
  <div class="q-pa-sm">
    <CompleteDialog ref="complete" />

    <div class="panel-wrap panel bg-white" v-if="isFreeosEnabled">

      <h4 class="q-mb-lg q-mt-lg text-center">Mint</h4>

      <div class="flex justify-center" style="flex-direction:row;">
        <q-btn class="tab-btn" v-bind:class="{ 'tab-btn--unselected': !isMintTabSelected }" outline unelevated no-caps
          @click="isMintTabSelected = !isMintTabSelected">Mint {{currencies.freeos}}</q-btn>
        <q-btn class="tab-btn" v-bind:class="{ 'tab-btn--unselected': isMintTabSelected }" outline unelevated no-caps
          @click="isMintTabSelected = !isMintTabSelected">Mint {{currencies.freebi}}</q-btn>
      </div>

      <!--MINT FREEOS-->
      <section v-if="isMintTabSelected">
        <p class="bg-primary text-h5 text-center text-white q-py-md">
          This could be a taxable event in your jurisdiction
        </p>
        <p class="q-py-md q-px-lg">The Mint Fee applies when you mint your ‘Claimed {{currencies.point}}S’ or {{currencies.freebi}} into a tradable
          token ({{currencies.freeos}}).
          For more info <a target="_blank" title="Minting FREEOS"
            href="https://docs.freeos.io/d/h/6k0z3-408/43bbcca7c54387a/6k0z3-1562"> click here.</a></p>


        <section class="q-ma-md panel">
          <div class="text-primary text-subtitle1 text-bold text-center q-pa-sm">Your Current balances:</div>
          <div class="balance-list">
            <div class="q-mb-sm q-mr-xs q-ml-xs bg-info text-center">
              <div class="text-bold text-subtitle1 font-bold" style="line-height:1;">
                <AbbreviateNumber :value="user.pointBalance" />
              </div>
              <div class="text-bold text-primary">{{currencies.point}}</div>
            </div>
            <div class="q-mb-sm q-mr-xs q-ml-xs bg-info text-center">
              <div class="text-bold text-subtitle1 font-bold" style="line-height:1;">
                <AbbreviateNumber :value="user.freebiBalance" />
              </div>
              <div class="text-bold text-primary">{{currencies.freebi}}</div>
            </div>
            <div class="q-mb-sm q-mr-xs q-ml-xs bg-info text-center">
              <div class="text-bold text-subtitle1 font-bold" style="line-height:1;">
                <AbbreviateNumber :value="user.freeosBalance" />
              </div>
              <div class="text-bold text-primary">{{currencies.freeos}}</div>
            </div>
            <div class="q-mb-sm q-mr-xs q-ml-xs bg-info text-center">
              <div class="text-bold text-subtitle1 font-bold" style="line-height:1;">
                <AbbreviateNumber :value="user.XPRBalance" />
              </div>
              <div class="text-bold text-primary">{{currencies.xpr}}</div>
            </div>
            <div class="q-mb-sm q-mr-xs q-ml-xs bg-info text-center" v-if="user.XUSDCBalance">
              <div class="text-bold text-subtitle1 font-bold" style="line-height:1;">
                <AbbreviateNumber :value="user.XUSDCBalance" />
              </div>
              <div class="text-bold text-primary">{{currencies.xusdc}}</div>
            </div>
          </div>

          <div v-if="user.mffBalance > 0">
            <hr class="q-mb-none" />
            <div class="text-primary text-subtitle1 text-bold text-center q-pa-sm">AirClaim Allowance balance:</div>

            <div class="balance-list">
              <div class="q-mb-sm q-mr-xs q-ml-xs bg-info text-center">
                <div class="text-bold text-subtitle1 font-bold" style="line-height:1;">
                  <AbbreviateNumber :value="user.mffBalance" />
                </div>
                <div class="text-bold text-primary">of your {{currencies.point}}S</div>
              </div>
            </div>
          </div>
        </section>

        <section class="q-ma-md panel">
          <div class="q-mt-sm text-primary text-subtitle1 text-bold text-center v q-pb-none">Mint Fee Details:</div>
          <div class="text-bold text-center q-mt-none q-pt-none q-pb-sm">
            <span class="q-pr-sm">{{currencies.freeos}} = {{rewardsPrevious['mint_fee_percent'] | roundTo4Decimal}}%</span>
            <span class="q-px-xs">{{currencies.xpr}} = {{rewardsPrevious['mint_fee_percent_xpr'] | roundTo4Decimal}}%</span>
            <span class="q-pl-sm">{{currencies.xusdc}} = {{rewardsPrevious['mint_fee_percent_xusdc'] | roundTo4Decimal}}%</span>

          </div>
          
          <div class="bg-info text-center">
            <div class="text-primary text-bold q-pt-sm q-pb-none">Minimum Mint Fee</div>
            <div class="text-subtitle2 q-mt-none q-pt-xs"><strong>{{mintFeeMin | roundTo4Decimal}} {{currencies.freeos}}</strong></div>
            <div class="text-subtitle2 q-mt-none"><small class="q-pr-sm">or</small><strong>{{xprMinMintfee |
            roundTo4Decimal}} {{currencies.xpr}}</strong></div>
            <div class="text-subtitle2 q-mt-none q-pb-md"><small class="q-pr-sm">or</small><strong>{{usdMinMintfee |
            roundTo6Decimal}} {{currencies.xusdc}}</strong></div>
          </div>
          <div v-if="this.user.hasNFT" class="bg-primary text-center text-white q-py-md">
            <div class="text-bold q-pb-none">You have a FREEDAO NFT</div>
            <div class="text-subtitle2 q-mt-none"><strong>No mint fee is required.</strong></div>
          </div>
        </section>





        <section class="q-ma-md panel">
          <div class="text-primary text-subtitle1 text-bold text-center q-pa-sm">Create a MINT Transaction</div>


          <div class="bg-info q-pa-md">


            <div class="row justify-center q-mb-sm q-pb-xs">
              <div class="col-xs-6 col-sm-5">
                <div class="q-mt-xs" style="line-height:1;"><small class="text-bold">1. Choose a balance to Mint
                    from:</small></div>
              </div>
              <div class="col-xs-6 col-sm-6">

                <q-select @input="submitData.quantity = 0"  label="Select" option-value="value" option-label="label" option-disable="disabled" emit-value
                  required dense outlined v-model="submitData.from" :options="balOptions" />
              </div>
            </div>


            <div v-if="submitData.from === currencies.point" class="row justify-center q-mb-md q-pb-xs">
              <div class="col-xs-6 col-sm-5">
                <p class="q-mt-none q-mb-none"><small class="text-bold text-primary">Your Available {{currencies.point}}S
                    Balance:</small>
                </p>
              </div>
              <div class="col-xs-6 col-sm-6">
                <p class="q-mt-none q-mb-none text-primary text-bold">{{ user.pointBalance }}</p>
              </div>
            </div>

            <div v-if="submitData.from === currencies.freebi" class="row justify-center q-mb-md q-pb-xs">
              <div class="col-xs-6 col-sm-5">
                <p class="q-mt-none q-mb-none"><small class="text-bold text-primary">Your Available {{currencies.freebi}}
                    Balance:</small>
                </p>
              </div>
              <div class="col-xs-6 col-sm-6">
                <p class="q-mt-none q-mb-none text-primary text-bold">{{user.freebiBalance}}</p>
              </div>
            </div>

            <div class="row justify-center q-mb-sm q-pb-xs">
              <div class="col-xs-6 col-sm-5">
                <div class="q-mt-xs" style="line-height:1;"><small class="text-bold">2. Amount to
                    Mint:</small><br /><small style="font-style:italic">from account '{{this.accountName}}'</small>
                </div>
              </div>
              <div class="col-xs-6 col-sm-6">
                <label data-v-052b630f="" for="f_8b8778e2-d74d-4d9f-8e69-cd43d21fcac5"
                  class="q-field row no-wrap items-start q-input q-field--outlined q-field--dense q-validation-component">
                  <div class="q-field__inner relative-position col self-stretch">
                    <div tabindex="-1" class="q-field__control relative-position row no-wrap">
                      <div class="q-field__control-container col relative-position row no-wrap q-anchor--skip"><input
                          v-model="submitData.quantity" tabindex="0" required="required"
                          id="f_8b8778e2-d74d-4d9f-8e69-cd43d21fcac5" type="number"
                          class="q-field__native q-placeholder">
                        <q-btn :disabled="!submitData.from" class="max-btn" size="sm" unelevated no-caps
                          color="secondary" @click="setMintMaxAmount()">Max
                        </q-btn>

                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>
            <div class="row justify-center q-mb-sm q-pb-xs" v-if="submitData.from !== 'AIRCLAIM ALLOWANCE'">
              <div class="col-xs-6 col-sm-5">
                <div class="q-mt-xs" style="line-height:1;"><small class="text-bold">3. Pay the Mint Fee with:</small>
                </div>
              </div>
              <div class="col-xs-6 col-sm-6">
                <q-select label="Select" option-value="value" option-label="label" option-disable="disabled" emit-value
                  required dense outlined v-model="submitData.pay" :options="mintFeeOptions" />
              </div>
            </div>
            <hr />

            <div
              v-if="submitData.from && (submitData.pay || submitData.from ==='AIRCLAIM ALLOWANCE') && submitData.quantity > 0 && submitData.quantity <= mintMaxAmount">

              <div v-if="!this.user.hasNFT">
                <div class="q-mt-md text-primary text-bold"><small>Transaction Mint Fee Charge:</small></div>
                <div class="row justify-center">
                  <div class="col-xs-6 col-sm-5">
                    <p class="q-mt-xs q-mb-none"><small class="text-bold">Total Mint Fee will be:</small>
                    </p>
                  </div>
                  <div class="col-xs-6 col-sm-6" v-if="submitData.pay !== currencies.xusdc">
                    <p class="q-mt-xs q-mb-none text-bold">{{ finalMintFeeFreeos | roundTo4Decimal }} {{submitData.pay}}
                    </p>
                  </div>
                  <div class="col-xs-6 col-sm-6" v-if="submitData.pay === currencies.xusdc">
                    <p class="q-mt-xs q-mb-none text-bold">{{ finalMintFeeFreeos | roundTo6Decimal }} {{submitData.pay}}
                    </p>
                  </div>
                </div>
              </div>
              <div class="row justify-center" v-if="user.mffBalance > 0 && submitData.pay === 'AIRCLAIM ALLOWANCE'">
                <div class="col-xs-6 col-sm-5">
                  <p class="q-mt-xs q-mb-none"><small class="text-bold">AirClaim Allowance used:</small>
                  </p>
                </div>
                <div class="col-xs-6 col-sm-6">
                  <p class="q-mt-xs q-mb-none text-bold">{{ mintFeeFreePointsUsed | roundTo4Decimal }} {{currencies.point}}S</p>
                </div>
              </div>
              <div class="row justify-center" v-if="user.mffBalance > 0 && submitData.pay === 'AIRCLAIM ALLOWANCE'">
                <div class="col-xs-6 col-sm-5">
                  <p class="q-mt-xs q-mb-none"><small class="text-bold">AirClaim Allowance balance to charge:</small>
                  </p>
                </div>
                <div class="col-xs-6 col-sm-6">
                  <p class="q-mt-xs q-mb-none text-bold">{{ user.mffBalance | roundTo4Decimal}} {{currencies.point}}S</p>
                </div>
              </div>


              <div v-if="!showMintFeeError" class="q-mt-md text-primary text-bold"><small>Expected Transaction Balances:</small></div>


              <div class="row justify-center" v-if="!showMintFeeError && submitData.from !== currencies.freebi">
                <div class="col-xs-6 col-sm-5">
                  <p class="q-mt-xs q-mb-none"><small class="text-bold">{{currencies.point}}S balance:</small>
                  </p>
                </div>
                <div class="col-xs-6 col-sm-6">
                  <p class="q-mt-xs q-mb-none text-bold">{{(user.pointBalance - parseFloat(submitData.quantity)) |
                  roundTo4Decimal }} {{currencies.point}}S</p>
                </div>
              </div>

              <div class="row justify-center" v-if="!showMintFeeError && submitData.from === currencies.freebi">
                <div class="col-xs-6 col-sm-5">
                  <p class="q-mt-xs q-mb-none"><small class="text-bold">{{currencies.freebi}} balance:</small>
                  </p>
                </div>
                <div class="col-xs-6 col-sm-6">
                  <p class="q-mt-xs q-mb-none text-bold">{{(user.freebiBalance - parseFloat(submitData.quantity)) |
                  roundTo4Decimal }} {{currencies.freebi}}</p>
                </div>
              </div>


              <div class="row justify-center" v-if="!showMintFeeError && submitData.pay === currencies.xpr">
                <div class="col-xs-6 col-sm-5">
                  <p class="q-mt-xs q-mb-none"><small class="text-bold">{{currencies.xpr}} balance:</small>
                  </p>
                </div>
                <div class="col-xs-6 col-sm-6">
                  <p class="q-mt-xs q-mb-none text-bold">{{parseFloat(user.XPRBalance - finalMintFeeFreeos) |
                  roundTo4Decimal }} {{currencies.xpr}}</p>
                </div>
              </div>

              <div class="row justify-center" v-if="!showMintFeeError && submitData.pay === currencies.xusdc">
                <div class="col-xs-6 col-sm-5">
                  <p class="q-mt-xs q-mb-none"><small class="text-bold">{{currencies.xusdc}} balance:</small>
                  </p>
                </div>
                <div class="col-xs-6 col-sm-6">
                  <p class="q-mt-xs q-mb-none text-bold">{{parseFloat(user.XUSDCBalance - finalMintFeeFreeos) |
                  roundTo6Decimal }} {{currencies.xusdc}}</p>
                </div>
              </div>


              <div class="row justify-center" v-if="!showMintFeeError && user.mffBalance > 0 && submitData.pay === 'AIRCLAIM ALLOWANCE'">
                <div class="col-xs-6 col-sm-5">
                  <p class="q-mt-xs q-mb-none"><small class="text-bold">AirClaim Allowance balance:</small>
                  </p>
                </div>
                <div class="col-xs-6 col-sm-6">
                  <p class="q-mt-xs q-mb-none text-bold">{{parseFloat(user.mffBalance - mintFeeFreePointsUsed) |
                  roundTo4Decimal}} {{currencies.point}}S</p>
                </div>
              </div>


              <div class="row justify-center">
                <div class="col-xs-6 col-sm-5">
                  <p class="q-mt-xs q-mb-none"><small class="text-bold">{{currencies.freeos}} balance:</small>
                  </p>
                </div>
                <div class="col-xs-6 col-sm-6">
                  <p class="q-mt-xs q-mb-none text-bold" v-bind:class="{ 'text-negative': freeosBalance < 0 }"
                    text-negative>{{freeosBalance | roundTo4Decimal}} {{currencies.freeos}}</p>
                </div>
              </div>


            </div>
            <div class="text-negative text-center q-mt-md" v-if="showMintFeeError"><strong>You do not have enough to
                complete the transaction</strong></div>
            <div style="align-items: center;" class="row justify-center q-mt-lg ">
              <q-btn @click="mintSubmit()" class="full-width" :disabled="disableMintFeeButton" size="xl" unelevated
                no-caps color="primary">
                Mint {{currencies.freeos}}</q-btn>
            </div>
          </div>
        </section>
      </section>










      <!--POINT TO FREEBI-->
      <section v-if="!isMintTabSelected">
        <p class="bg-primary text-h5 text-center text-white q-py-md">
          Mint {{currencies.point}}S to {{currencies.freebi}}
        </p>
        <p class="q-py-md q-px-lg">{{currencies.freebi}} is our internal trading token within the community and isn't subject to a Mint
          Fee. The {{currencies.freebi}} tokens exist as a way for participants to have a limited, but tradable, token that can be used
          for Peer-to-Peer activities, while protecting the {{currencies.freeos}} token's circulating supply. For more info <a
            href="https://docs.freeos.io/d/h/6k0z3-408/43bbcca7c54387a/6k0z3-1582" target="_blank">click
            here.</a></p>


        <section class="q-ma-md panel">
          <div class="text-primary text-subtitle1 text-bold text-center q-pa-sm">Your current balances:</div>
          <div class="balance-list">
            <div class="q-mb-sm q-mr-xs q-ml-xs bg-info text-center">
              <div class="text-bold text-subtitle1 font-bold" style="line-height:1;">
                <AbbreviateNumber :value="user.pointBalance" />
              </div>
              <div class="text-bold text-primary">{{currencies.point}}</div>
            </div>
            <div class="q-mb-sm q-mr-xs q-ml-xs bg-info text-center">
              <div class="text-bold text-subtitle1 font-bold" style="line-height:1;">
                <AbbreviateNumber :value="user.freebiBalance" />
              </div>
              <div class="text-bold text-primary">{{currencies.freebi}}</div>
            </div>
            <div class="q-mb-sm q-mr-xs q-ml-xs bg-info text-center">
              <div class="text-bold text-subtitle1 font-bold" style="line-height:1;">
                <AbbreviateNumber :value="user.freeosBalance" />
              </div>
              <div class="text-bold text-primary">{{currencies.freeos}}</div>
            </div>
          </div>

        </section>

        <section class="q-ma-md">
          <GetVerified message="You must be verified to mint FREEBI"></GetVerified>
        </section>


        <section class="q-ma-md panel" v-if="isVerified">
          <div class="text-primary text-subtitle1 text-bold text-center q-pa-sm">Mint Your {{currencies.point}}S to {{currencies.freebi}}</div>
          <div class="bg-info q-pa-md">
            <div class="row justify-center q-mb-sm q-pb-xs">
              <div class="col-xs-6 col-sm-5">
                <p class="q-mt-sm q-mb-none"><small class="text-bold text-primary">Your Available {{currencies.point}}S
                    Balance:</small>
                </p>
              </div>
              <div class="col-xs-6 col-sm-5">
                <p class="q-mt-sm q-mb-none text-primary text-bold">{{ user.pointBalance }}</p>
              </div>
            </div>
            <div class="row justify-center q-mb-sm q-pb-xs">
              <div class="col-xs-6 col-sm-5">
                <div class="q-mt-xs" style="line-height:1;"><small class="text-bold">Amount to Mint:</small><br /><small
                    style="font-style:italic">from account '{{this.accountName}}'</small></div>
              </div>
              <div class="col-xs-6 col-sm-5">



                <label data-v-052b630f="" for="f_8b8778e2-d74d-4d9f-8e69-cd43d21fcac5"
                  class="q-field row no-wrap items-start q-input q-field--outlined q-field--dense q-validation-component">
                  <div class="q-field__inner relative-position col self-stretch">
                    <div tabindex="-1" class="q-field__control relative-position row no-wrap">
                      <div class="q-field__control-container col relative-position row no-wrap q-anchor--skip"><input
                          v-model="sendAmount" tabindex="0" required="required"
                          id="f_8b8778e2-d74d-4d9f-8e69-cd43d21fcac5" type="number"
                          class="q-field__native q-placeholder">
                        <q-btn class="max-btn" size="sm" unelevated no-caps color="secondary"
                          @click="freebiMaxAmount()">Max
                        </q-btn>

                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>
            <hr />
            <div v-if="sendAmount">
              <div class="q-mt-md text-primary text-bold"><small>Expected Transaction Balances:</small></div>

              <div class="row justify-center">
                <div class="col-xs-6 col-sm-5">
                  <p class="q-mt-xs q-mb-none"><small class="text-bold">{{currencies.point}}S balance will be:</small>
                  </p>
                </div>
                <div class="col-xs-6 col-sm-5">
                  <p class="q-mt-xs q-mb-none text-bold">{{(parseFloat(user.pointBalance) - parseFloat(sendAmount)) |
                  roundTo4Decimal}}</p>
                </div>
              </div>


              <div class="row justify-center">
                <div class="col-xs-6 col-sm-5">
                  <p class="q-mt-xs q-mb-none"><small class="text-bold">{{currencies.freebi}} balance will be:</small>
                  </p>
                </div>
                <div class="col-xs-6 col-sm-5">
                  <p class="q-mt-xs q-mb-none text-bold">{{(parseFloat(user.freebiBalance) + parseFloat(sendAmount)) |
                  roundTo4Decimal}}</p>
                </div>
              </div>
            </div>
            <div style="align-items: center;" class="row justify-center q-mt-lg ">
              <q-btn @click="submit()"
                :disabled="!(parseFloat(sendAmount) > 0) || parseFloat(sendAmount) > parseFloat(user.pointBalance)"
                class="full-width" size="xl" unelevated no-caps :disable="false" color="primary">
                Mint {{currencies.freebi}}</q-btn>
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
import GetVerified from 'src/components/GetVerified.vue'




export default {
  name: 'Convert',
  components: {
    CompleteDialog,
    AbbreviateNumber,
    GetVerified,
  },
  data() {
    return {
      isMintTabSelected: true,
      submitData: {
        pay: null,
        quantity: 0,
        from: null
      },
      mintFeeOptions: [],
      isMintTab: true,
      sendAmount: 0,
      tokenCurrencyName: this.$options.filters.capitalize(process.env.TOKEN_CURRENCY_NAME),
      currencyName: process.env.CURRENCY_NAME
    }
  },
  computed: {
    balOptions() {
        var balOptions = [
        {
          label: this.currencies.point+'S',
          value: this.currencies.point,
          disabled: this.checkIfDisabled(this.user.pointBalance)
        },
        {
          label: this.currencies.freebi,
          value: this.currencies.freebi,
          disabled: this.checkIfDisabled(this.user.freebiBalance)
        }
      ]
      if (this.user.mffBalance) balOptions.unshift({ label: 'AirClaim Allowance <small>(No mint fee)</small>', value: 'AIRCLAIM ALLOWANCE', disabled: false })

      return balOptions
    },
    mintfeePayable() {//mintfee_payable
      var result = 0;
      const qty = parseFloat(this.submitData.quantity);

      return qty;
    },
    showMintFeeError() {
      //freeosBalance < 0 || !submitData.from || (!submitData.pay && submitData.from !=='AIRCLAIM ALLOWANCE') || !(submitData.quantity > 0 && submitData.quantity <= mintMaxAmount)
      let isLowerThanMintFee = false;
      if (this.submitData.pay === this.currencies.freeos) {
        if (this.finalMintFeeFreeos > this.user.freeosBalance) isLowerThanMintFee = true;
      } else if (this.submitData.pay === this.currencies.xpr) {
        if (this.finalMintFeeFreeos > this.user.XPRBalance) isLowerThanMintFee = true;
      } else if (this.submitData.pay === this.currencies.xusdc) {
        if (this.finalMintFeeFreeos > this.user.XUSDCBalance) isLowerThanMintFee = true;
      }

      return this.submitData.from && this.submitData.quantity > 0 && (this.freeosBalance < 0 || this.submitData.quantity > this.mintMaxAmount) || isLowerThanMintFee
    },
    disableMintFeeButton() {
      //freeosBalance < 0 || !submitData.from || (!submitData.pay && submitData.from !=='AIRCLAIM ALLOWANCE') || !(submitData.quantity > 0 && submitData.quantity <= mintMaxAmount)
      let isLowerThanMintFee = false;
      if (this.submitData.pay === this.currencies.freeos) {
        if (this.finalMintFeeFreeos > this.user.freeosBalance) isLowerThanMintFee = true;
      } else if (this.submitData.pay === this.currencies.xpr) {
        if (this.finalMintFeeFreeos > this.user.XPRBalance) isLowerThanMintFee = true;
      } else if (this.submitData.pay === this.currencies.xusdc) {
        if (this.finalMintFeeFreeos > this.user.XUSDCBalance) isLowerThanMintFee = true;
      }

      return this.freeosBalance < 0 || !this.submitData.from || (!this.submitData.pay && this.submitData.from !== 'AIRCLAIM ALLOWANCE') || !(this.submitData.quantity > 0 && this.submitData.quantity <= this.mintMaxAmount) || isLowerThanMintFee
    },

    mintFeeInFreeos() {//mintfee_in_freeos
      return this.mintfeePayable * (parseFloat(this.rewardsPrevious['mint_fee_percent']) / 100);
    },
    mintFeeInXPR() {//mintfee_in_freeos
      return this.mintfeePayable * (parseFloat(this.rewardsPrevious['mint_fee_percent_xpr']) / 100);
    },
    mintFeeInXUSDC() {//mintfee_in_freeos
      return this.mintfeePayable * (parseFloat(this.rewardsPrevious['mint_fee_percent_xusdc']) / 100);
    },
    finalMintFeeFreeos() {//final_mintfee_in_freeos & minfee
      if (this.submitData.pay === this.currencies.freeos) {
        if (this.mintFeeInFreeos < this.mintFeeMin) {
          return this.mintFeeMin;
        } else {
          return this.mintFeeInFreeos;
        }
      } else if (this.submitData.pay === this.currencies.xpr) {

        var calcXPR = this.mintFeeInXPR * (parseFloat(this.freeosContract['usdrate']) / parseFloat(this.xprContract['usdrate']));
        if (calcXPR > this.xprMinMintfee) {
          return calcXPR;
        } else {
          return this.xprMinMintfee;
        }



      } else if (this.submitData.pay === this.currencies.xusdc) {
        var calcXUSDC = this.mintFeeInXUSDC * (parseFloat(this.freeosContract['usdrate']) / parseFloat(this.usdContract['usdrate']));
        if (calcXUSDC > this.usdMinMintfee) {
          return calcXUSDC;
        } else {
          return this.usdMinMintfee;
        }
      }

      return 0;
    },
    xprMinMintfee() {
      var result = 0;
      if (this.mintFeeMin && this.xprContract && this.freeosContract['usdrate']) {
        result = this.mintFeeMin * (parseFloat(this.freeosContract['usdrate']) / parseFloat(this.xprContract['usdrate']))
      }
      return result;
    },
    usdMinMintfee() {
      var result = 0;
      if (this.mintFeeMin && this.usdContract && this.freeosContract['usdrate']) {
        result = this.mintFeeMin * (parseFloat(this.freeosContract['usdrate']) / parseFloat(this.usdContract['usdrate']))
      }
      return result;
    },
    mintFeeFreePointsUsed() {
      const qty = parseFloat(this.submitData.quantity);
      if (this.submitData.from === 'AIRCLAIM ALLOWANCE') {
        return qty;
      } else {
        return 0;
      }
    },
    mintMaxAmount() {
      if (this.submitData.from === this.currencies.point) {
        return this.user.pointBalance
      } else if (this.submitData.from === this.currencies.freebi) {
        return this.user.freebiBalance
      } else if (this.submitData.from === 'AIRCLAIM ALLOWANCE') {
        if (this.user.pointBalance > this.user.mffBalance) {
          return this.user.mffBalance;
        } else {
          return this.user.pointBalance; //Return pointBalance as Max if less then MFF balance
        }
      } else {
        return 0;
      }
    },
    freeosBalance() {
      const qty = parseFloat(this.submitData.quantity);

      if (this.submitData.pay === this.currencies.freeos) {
        return this.user.freeosBalance + qty - this.finalMintFeeFreeos;
      } else {
        return this.user.freeosBalance + qty;
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
      'freeosContract',
      'currencies'
    ])
  },
  methods: {
    ...mapActions('freeos', ['mintFreeBI', 'mintFreeos']),
    setMintMaxAmount() {
      this.submitData.quantity = this.mintMaxAmount;
    },
    checkIfDisabled(val) {
      if (val) {
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
      var result = await this.mintFreeBI({ owner: this.accountName, quantity: `${parseFloat(this.sendAmount).toFixed(process.env.TOKEN_PRECISION)} ${process.env.TOKEN_CURRENCY_NAME}` })

      if (!(result instanceof Error)) {
        var amount = this.sendAmount;
        this.$refs.complete.openDialog({
          title: "Woohoo!", subtitle: "You minted", value: amount, currency: this.currencies.freebi
        });
        this.resetForm();
      }
      console.log('resultR', result)
    },
    async mintSubmit() {
      const t = this;
      var qty = parseFloat(this.submitData.quantity);

      var transactionArray = [];

      if (this.submitData.from === this.currencies.freebi) {
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
      console.log('finalMintFeeFreeo', this.finalMintFeeFreeos);
      if (this.finalMintFeeFreeos) {
        //pay Mint fee
        var dataToSubmit = {};
        dataToSubmit.from = this.accountName;

        dataToSubmit.memo = 'freeos mint fee';
        //dataToSubmit.memo =  this.mintFeeInFreeos + " " + this.submitData.pay;
        dataToSubmit.to = process.env.FREEOSGOV_CONTRACT;


        console.log('mintFeeInFreeos', this.mintFeeInFreeos)


        if (this.submitData.pay === this.currencies.freeos) {
          dataToSubmit.contract = this.freeosContract['contract'];
          dataToSubmit.quantity = `${parseFloat(this.finalMintFeeFreeos).toFixed(process.env.TOKEN_PRECISION)} ${this.submitData.pay}`;
        } else if (this.submitData.pay === this.currencies.xpr) {
          dataToSubmit.contract = this.xprContract['contract'];
          dataToSubmit.quantity = `${parseFloat(this.finalMintFeeFreeos).toFixed(process.env.XPR_CURRENCY_PRECISION)} ${this.submitData.pay}`;
        } else if (this.submitData.pay === this.currencies.xusdc) {
          dataToSubmit.contract = this.usdContract['contract'];
          dataToSubmit.quantity = `${parseFloat(this.finalMintFeeFreeos).toFixed(process.env.XUSDC_CURRENCY_PRECISION)} ${this.submitData.pay}`;
        }
        transactionArray.push(dataToSubmit);
        //var result = await this.transfer(dataToSubmit, accountContract);
      }

      console.log()
      var dataToSubmit = {};
      dataToSubmit.user = this.accountName;

      if (this.submitData.from === 'AIRCLAIM ALLOWANCE') {
        dataToSubmit.input_quantity = `${qty.toFixed(process.env.TOKEN_PRECISION)} ${this.currencies.point}`;
      } else {
        dataToSubmit.input_quantity = `${qty.toFixed(process.env.TOKEN_PRECISION)} ${this.submitData.from}`;
      }


      //if(this.submitData.pay === 'FREEOS' || this.submitData.from === 'AIRCLAIM ALLOWANCE')
      dataToSubmit.mint_fee_currency = '4,'+this.currencies.freeos; // + this.submitData.pay;

      if (this.submitData.pay === this.currencies.xpr) {
        dataToSubmit.mint_fee_currency = process.env.XPR_CURRENCY_PRECISION + ',' + this.submitData.pay;
      } else if (this.submitData.pay === this.currencies.xusdc) {
        dataToSubmit.mint_fee_currency = process.env.XUSDC_CURRENCY_PRECISION + ',' + this.submitData.pay;
      }

      dataToSubmit.use_airclaim_points = this.submitData.from === 'AIRCLAIM ALLOWANCE' ? true : false;

      dataToSubmit.contract = process.env.FREEOSGOV_CONTRACT;
      transactionArray.push(dataToSubmit);


      var result = await this.mintFreeos(transactionArray);




      if (!(result instanceof Error)) {
        this.$refs.complete.openDialog({
          title: "Woohoo!", subtitle: "You minted", value: qty, currency: this.currencies.freeos
        });
        t.resetForm();
      }

      console.log('resultR', result)

    },

    resetForm() {
      this.sendAmount = 0
      this.submitData = {
        pay: null,
        quantity: 0,
        from: null
      }
    }
  },
  created() {


    this.mintFeeOptions = [
      {
        label: this.currencies.freeos+' <small>(' + this.$options.filters.roundTo4Decimal(this.rewardsPrevious['mint_fee_percent']) + '%)</small>',
        value: this.currencies.freeos,
        disabled: this.checkIfDisabled(this.user.freeosBalance)
      },
      {
        label: this.currencies.xpr + ' <small>(' + this.$options.filters.roundTo4Decimal(this.rewardsPrevious['mint_fee_percent_xpr']) + '%)</small>',
        value: this.currencies.xpr,
        disabled: this.checkIfDisabled(this.user.XPRBalance)
      },
      {
        label: this.currencies.xusdc + ' <small>(' + this.$options.filters.roundTo6Decimal(this.rewardsPrevious['mint_fee_percent_xusdc']) + '%)</small>',
        value: this.currencies.xusdc,
        disabled: this.checkIfDisabled(this.user.XUSDCBalance)
      }
    ]
    if (this.user.hasNFT) {
      this.mintFeeOptions = [{
        label: 'NFT <small>(Zero Mint Fee)</small>',
        value: 'NFT',
        disabled: this.checkIfDisabled(this.user.hasNFT)
      }];
      this.submitData.pay = 'NFT'
    }
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
