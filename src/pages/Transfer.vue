<template>
<div class="q-pa-md">
    <div class="q-gutter-y-md q-mx-auto" style="max-width: 600px">

        <div class="panel-wrap">
            <q-card class="panel">

                <div class="text-h4 text-center q-ma-lg">Send Tokens</div>
                <div v-if="tokensSelectOptions.length > 0" class="row justify-center q-mb-md q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
                    <div class="col-xs-5 col-sm-4">
                        <p class="q-mt-sm q-mb-none">To account:</p>
                    </div>
                    <div class="col-xs-6 col-sm-8">
                        <q-input v-model="submitData.to" type="text" outlined dense />
                    </div>
                </div>
                <div class="row justify-center q-mb-md q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
                    <div class="col-xs-5 col-sm-4">
                        <p class="q-mt-sm q-mb-none">Tokens:</p>
                    </div>
                    <div class="col-xs-6 col-sm-8">
                        <q-select dense outlined v-model="submitData.token" :options="tokensSelectOptions" />
                    </div>
                </div>
                <div class="row justify-center q-mb-md q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
                    <div class="col-xs-5 col-sm-4">
                        <p class="q-mt-sm q-mb-none">Amount:</p>
                    </div>
                    <div class="col-xs-6 col-sm-8">
                        <q-input required v-model="submitData.quantity" type="number" outlined dense />
                        <p class="q-mb-none text-grey" v-if="submitData.token === stakeCurrency"><small>{{XPRBalance}}{{stakeCurrency}} available to transfer</small></p>
                        <p class="q-mb-none text-grey" v-if="submitData.token === 'FREEOS'"><small>{{liquidFreeos}}FREEOS available to transfer</small></p>
                    </div>
                </div>
                <div class="row justify-center q-mb-md q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
                    <div class="col-xs-5 col-sm-4">
                        <p class="q-mt-sm q-mb-none">Comment:</p>
                    </div>
                    <div class="col-xs-6 col-sm-8">
                        <q-input v-model="submitData.memo" type="text" outlined dense />
                    </div>
                </div>
                <div style="align-items: center;" class="row justify-center q-mb-md q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
                    <div class="col-xs-5 col-sm-4">
                    </div>
                    <div class="col-xs-6 col-sm-8">
                        <q-btn unelevated no-caps outline color="primary" v-if="isAuthenticated" @click="submit()">Send</q-btn>

                    </div>

                </div>

            </q-card>

            <q-card class="panel q-mt-lg q-pa-lg">

                <div class="text-h4 text-center">Receive Tokens</div>
                <div class="q-mt-md text-center text-subtitle1">@{{accountName}}</div>

                <q-btn @click="protonSwap()" href="https://www.protonswap.com/swap" class="q-mt-xl" unelevated no-caps outline color="primary" v-if="isAuthenticated">Need Tokens? try Proton Swap</q-btn>

            </q-card>

        </div>
        <!-- <q-dialog v-model="isShowApprovedDialog">
        <q-card>
          <q-card-section>
            <div class="text-center">
              <div class="text-h6 q-mb-sm">Your transaction been approved!</div>
              <div>
                <q-icon size='xl' name="done" color="positive" style="font-weight: bolder;" />
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section style="max-height: 50vh" class="scroll">
            <div class="text-center">
              <div class="q-ma-lg text-weight-bold">
                Your transaction successfully written into block:
              </div>
              <div class="q-mb-xl" style="word-break: break-all;">
                645d68c7469cecb14c0eed99346ea7f063346aef5165f37c528e4cf9fcf08968
              </div>
              <div class="q-ma-lg text-weight-bold">
                Transaction Details
              </div>
              <div class="q-mb-xl">
                40 EOS from asdf209832szf to wek238fdsfh on 29.11.2020 / 6:16; Hello
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="center">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <q-dialog v-model="isShowFailedDialog">
        <q-card>
          <q-card-section>
            <div class="text-center">
              <div class="text-h6 q-mb-sm">Your transaction failed to proceed</div>
              <div>
                <q-icon size='xl' name="clear" color="negative" style="font-weight: bolder;" />
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section style="max-height: 50vh" class="scroll">
            <div class="text-center">
              <div class="q-ma-md text-weight-bold">
                Sorry, we couldn't process your transaction
              </div>
              <div class="q-ma-md q-mb-xl">
                <span class="text-weight-bold q-mr-lg">Error Code:</span> 661
              </div>
              <div class="q-ma-md q-mb-lg">
                <span class="text-weight-bold q-mr-lg">Error Details:</span> <span style="visibility: hidden;">661</span>
              </div>
              <div class="q-mb-xl">
                Couldn't find an account with accountname aasdf123. <br>
                Please check receiver account name
              </div>
            </div>
          </q-card-section>
          <q-separator />
          <q-card-actions align="center">
            <q-btn flat label="OK" color="primary" v-close-popup />
          </q-card-actions>
        </q-card>
      </q-dialog> -->
    </div>
</div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import {
  getAbsoluteAmount
} from '@/utils/currency'

export default {
  name: 'Transfer',
  data () {
    return {
      stakeCurrency: process.env.STAKING_CURRENCY,
      submitData: {
        to: null,
        token: null,
        quantity: null,
        memo: '',
        from: null
      },
      isShowApprovedDialog: false,
      isShowFailedDialog: false
    }
  },
  computed: {
    ...mapGetters('freeos', ['accountName', 'XPRBalance', 'liquidFreeos', 'isAuthenticated']),
    tokensSelectOptions () {
      const types = []
      if (this.XPRBalance > 0) {
        types.push(this.stakeCurrency)
      }
      if (this.liquidFreeos > 0) {
        types.push('FREEOS')
        this.submitData.token = 'FREEOS'
      }
      return types
    },
    isFormFilled () {
      return !Object.values(this.submitData).some(x => (x === null || x === ''))
    }
  },
  methods: {
    ...mapActions('freeos', ['fetch', 'transfer']),
    async submit () {
      this.submitData.from = this.accountName
      var result = await this.transfer(this.submitData)
      console.log('resultR', result)
      this.resetForm()
    },
    protonSwap(){
       window.open("https://www.protonswap.com/swap", '_blank');
    },
    resetForm () {
      this.submitData = {
        to: null,
        token: null,
        quantity: null,
        memo: '',
        from: null
      }
    }
  }
}
</script>

<style scoped>

</style>
