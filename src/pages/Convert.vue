<template>
  <div>
    <CompleteDialog ref="complete" />



    <div class="panel-wrap panel bg-white" v-if="isFreeosEnabled">
      <h4 class="q-mb-lg q-mt-lg text-center">Mint or Convert Options</h4>


      <p class="bg-primary text-h5 text-center text-white q-py-md">
        Converting Points to FREEBI
      </p>
      <p class="q-py-md q-px-lg">FREEBI is our internal trading token within the community and isn’t subject to a Mint
        Fee. The FREEBI tokens exist as a way for participants to have a limited, but tradable, token that can be used
        for Peer-to-Peer activities, while protecting the FREEOS token’s circulating supply. More info <a href="https://docs.freeos.io/d/h/6k0z3-408/43bbcca7c54387a/6k0z3-1442" target="_blank">click
          here</a></p>


      <section class="q-ma-md panel">
        <div class="text-primary text-subtitle1 text-bold text-center q-pa-sm">Your current balances:</div>
        <div class="balance-list">
              <div class="q-mb-sm q-mr-xs q-ml-xs bg-info text-center">
                  <div class="text-bold text-subtitle1 font-bold" style="line-height:1;">{{ user.pointBalance }}</div>
                  <div class="text-bold text-primary">POINTS</div>
              </div>
              <div class="q-mb-sm q-mr-xs q-ml-xs bg-info text-center">
                  <div class="text-bold text-subtitle1 font-bold" style="line-height:1;">{{ user.freebiBalance }}</div>
                  <div class="text-bold text-primary">FREEBI</div>
              </div>
              <div class="q-mb-sm q-mr-xs q-ml-xs bg-info text-center">
                  <div class="text-bold text-subtitle1 font-bold" style="line-height:1;">{{ user.freeosBalance }}</div>
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
              <div class="q-mt-xs" style="line-height:1;"><small class="text-bold">Amount to Convert:</small><br/><small style="font-style:italic">from your ‘from account’</small></div>
            </div>
            <div class="col-xs-6 col-sm-6">



              <label data-v-052b630f="" for="f_8b8778e2-d74d-4d9f-8e69-cd43d21fcac5"
                class="q-field row no-wrap items-start q-input q-field--outlined q-field--dense q-validation-component">
                <div class="q-field__inner relative-position col self-stretch">
                  <div tabindex="-1" class="q-field__control relative-position row no-wrap">
                    <div class="q-field__control-container col relative-position row no-wrap q-anchor--skip"><input
                        v-model="sendAmount" tabindex="0" required="required" id="f_8b8778e2-d74d-4d9f-8e69-cd43d21fcac5"
                        type="number" class="q-field__native q-placeholder">
                      <q-btn class="max-btn" size="sm" unelevated no-caps color="secondary"
                        @click="maxAmount()">Max</q-btn>

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
                      <p class="q-mt-xs q-mb-none text-bold">{{parseFloat(user.pointBalance) - parseFloat(sendAmount)}}</p>
                    </div>
                  </div>


                  <div class="row justify-center">
                    <div class="col-xs-5 col-sm-6">
                      <p class="q-mt-xs q-mb-none"><small class="text-bold">POINTS balance will be:</small>
                      </p>
                    </div>
                    <div class="col-xs-6 col-sm-6">
                      <p class="q-mt-xs q-mb-none text-bold">{{parseFloat(user.freebiBalance) + parseFloat(sendAmount)}}</p>
                    </div>
                  </div>
        </div>
          <div style="align-items: center;" class="row justify-center q-mt-lg ">
            <q-btn @click="submit()" :disabled="!(sendAmount > 0) || sendAmount > user.pointBalance" class="full-width" size="xl" unelevated no-caps :disable="false" color="primary">
              Convert to FREEBI</q-btn>
          </div>
        </div>
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


export default {
  name: 'Convert',
  components: {
    CompleteDialog
  },
  data() {
    return {
      sendAmount: 0,
      tokenCurrencyName: this.$options.filters.capitalize(process.env.TOKEN_CURRENCY_NAME),
      stakeCurrency: process.env.STAKING_CURRENCY,
      currencyName: process.env.CURRENCY_NAME,
      convertWatch: false
    }
  },
  computed: {
    ...mapGetters('freeos', [
      'isFreeosEnabled',
      'isVerified',
      'user',
      'accountType',
      'nextClaimIn',
      'currentIteration',
      'eligibleToClaim',
      'nextActivity',
      'accountName'
    ]),
  },
  methods: {
    ...mapActions('freeos', ['mintFreeBI']),
    maxAmount() {
      if (this.user.pointBalance) {
        this.sendAmount = this.user.pointBalance
      }
    },

    async submit() {
      this.convertWatch = true
      console.log('2');
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
    resetForm() {
      this.sendAmount = 0
    }
  }
}
</script>

<style scoped>
  .balance-list{
    display:flex;
    flex-flow:row wrap;
    align-items: center;
    justify-content:center;
  }
  .balance-list>*{
    flex:0 0 46%;
    max-width:46%;
    padding:8px;
    border-radius: 8px;
  }
</style>
