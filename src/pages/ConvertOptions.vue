<template>
<div class="q-pa-md">
    <div class="q-gutter-y-md q-mx-auto" style="max-width: 600px">

        <div class="panel-wrap">
            <q-card class="panel  q-pa-lg">

                <div class="text-h4 text-center q-ma-lg">Convert Your Options</div>
                <p class="text-center">Convert your FREEOS OPTONS into FREEOS Tokens. For more info, click here.</p>
                 <div class="panel panel-strong q-pa-lg text-center q-mb-lg q-pa-lg">
                    <p class="q-mb-sm text-subtitle1" style="line-height:1.2;"><strong>Your current FREEOS OPTIONS balance is:</strong></p>
                    <h4 class="text-h5 q-ma-xs" style="line-height:1;">{{liquidOptions}}</h4>
                    <p class="q-ma-xs" style="line-height:1;"><strong><small>FREEOS OPTIONS</small></strong></p>
                 </div>

                <div style="align-items: center;" class="row justify-center q-mb-md q-pb-xs">
                    <div class="col-xs-5 col-sm-4">
                        OPT’s amount:
                    </div>
                    <div class="col-xs-1"></div>
                    <div class="col-xs-6 col-sm-7">
                        <q-input v-model="submitData.sendAmount" type="number" outlined dense />
                    </div>
                </div>
                <div style="align-items: center;" class="row justify-center q-mb-md q-pb-xs">
                    <div class="col-xs-5 col-sm-4">
                    </div>
                    <div class="col-xs-1"></div>
                    <div class="col-xs-6 col-sm-7">
                        <q-btn unelevated no-caps outline :disable="!isFormFilled" color="primary" v-if="!isAuthenticated" @click="submit()">Convert to Tokens</q-btn>

                    </div>

                </div>

            </q-card>

        </div>

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

export default {
  name: 'Convert Options',
  data () {
    return {
      submitData: {
        sendAmount: null
      }

    }
  },
  computed: {
    ...mapGetters('freeos', ['liquidOptions']),
    ...mapState({
      accountName: state => state.account.accountName,
      liquidBalance: state => state.account.claimInfo.liquidInAccount ? state.account.claimInfo.liquidInAccount.balance : null
    })
  },
  methods: {
    ...mapActions('transfer', ['transferTokens']),
    ...mapActions('account', ['getAccountInfo']),
    submit () {
      const self = this
    },
    resetForm () {
      this.submitData = {
        sendAmount: null
      }
    }
  }
}
</script>

<style scoped>

</style>
