<template>
  <div class="q-pa-md">
    <div class="q-gutter-y-md q-mx-auto" style="max-width: 600px">
      <q-card>
        <q-tabs
          v-model="tab"
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="justify"
          narrow-indicator
        >
          <q-tab name="send" label="Send" />
          <!-- <q-tab name="scanQRCode" label="Scan QR code" /> -->
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="send">
            <div class="text-h6 text-center q-ma-lg">Send Tokens</div>
            <div style="max-width: 500px; margin: 0 auto;">
              <div style="align-items: center;" class="row justify-center q-mb-md q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
                <div class="col-xs-5 col-sm-4 text-right">
                  To account
                </div>
                <div class="col-xs-1 col-sm-2"></div>
                <div class="col-xs-6 col-sm-6">
                  <q-input
                    v-model="submitData.toAccountName"
                    type="text"
                    outlined
                    dense
                  />
                </div>
              </div>
              <div style="align-items: center;" class="row justify-center q-mb-md q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
                <div class="col-xs-5 col-sm-4 text-right">
                  Tokens
                </div>
                <div class="col-xs-1 col-sm-2"></div>
                <div class="col-xs-6 col-sm-6">
                  <q-select dense outlined v-model="submitData.tokenType" :options="tokensSelectOptions" label="" />
                </div>
              </div>
              <div style="align-items: center;" class="row justify-center q-mb-md q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
                <div class="col-xs-5 col-sm-4 text-right">
                  Amount
                </div>
                <div class="col-xs-1 col-sm-2"></div>
                <div class="col-xs-6 col-sm-6">
                  <q-input
                    v-model="submitData.sendAmount"
                    type="number"
                    outlined
                    dense
                  />
                </div>
              </div>
              <div style="align-items: center;" class="row justify-center q-mb-md q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
                <div class="col-xs-5 col-sm-4 text-right">
                  Memo
                </div>
                <div class="col-xs-1 col-sm-2"></div>
                <div class="col-xs-6 col-sm-6">
                  <q-input
                    v-model="submitData.memo"
                    type="text"
                    outlined
                    dense
                  />
                </div>
              </div>
            </div>
            <div class="flex justify-center">
              <q-btn class="q-ma-lg" color="positive" no-caps @click="submit()" label="Send" :disable="!isFormFilled"/>
            </div>
            <!-- <div class="flex justify-center">
              <q-btn class="q-ma-lg" color="primary" no-caps @click="isShowFailedDialog=true" label="Continue (test for failing)" />
            </div> -->
          </q-tab-panel>

          <!-- <q-tab-panel name="scanQRCode">
            <div>
              <div class="text-h6 text-center q-ma-lg">Please scan or upload a QR code</div>
              <div class="flex justify-center">
                <q-btn class="q-ma-lg" color="primary" no-caps label="Upload" />
                <q-btn class="q-ma-lg" color="primary" no-caps label="Continue" />
              </div>
            </div>
          </q-tab-panel> -->
        </q-tab-panels>
      </q-card>
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
import { mapState, mapActions } from 'vuex'
import { getAbsoluteAmount } from '@/utils/currency'

export default {
  name: 'Transfer',
  data () {
    return {
      tab: 'send',
      submitData: {
        toAccountName: null,
        tokenType: null,
        sendAmount: null,
        memo: null
      },
      isShowApprovedDialog: false,
      isShowFailedDialog: false
    }
  },
  computed: {
    ...mapState({
      accountName: state => state.account.accountName,
      liquidBalance: state => state.account.claimInfo.liquidInAccount ? state.account.claimInfo.liquidInAccount.balance : null
    }),
    tokensSelectOptions () {
      const types = ['FREEOS']
      if (getAbsoluteAmount(this.liquidBalance) > 0) {
        types.push('XPR')
      }
      return types
    },
    isFormFilled () {
      return !Object.values(this.submitData).some(x => (x === null || x === ''))
    }
  },
  methods: {
    ...mapActions('transfer', ['transferTokens']),
    ...mapActions('account', ['getAccountInfo']),
    submit () {
      const self = this
      this.submitData.fromAccountName = this.accountName
      this.transferTokens(this.submitData)
        .then(response => {
          self.getAccountInfo()
          self.resetForm()
        })
    },
    resetForm () {
      this.submitData = {
        toAccountName: null,
        tokenType: null,
        sendAmount: null,
        memo: null
      }
    }
  }
}
</script>

<style scoped>

</style>
