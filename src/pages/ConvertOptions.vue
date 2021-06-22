<template>
<div class="q-pa-md">
    <div class="q-gutter-y-md q-mx-auto" style="max-width: 600px">

        <div class="panel-wrap">
            <q-card class="panel  q-pa-lg">

                <div class="text-h4 text-center q-ma-lg">Convert Your Options</div>
                <p class="text-center">Convert your {{currencyName}} OPTIONS into {{currencyName}} Tokens. For more info, click here.</p>
                 <div class="panel panel-strong q-pa-lg text-center q-mb-lg q-pa-lg">
                    <p class="q-mb-sm text-subtitle1" style="line-height:1.2;"><strong>Your current {{currencyName}} OPTIONS balance is:</strong></p>
                    <h4 class="text-h5 q-ma-xs" style="line-height:1;">{{liquidOptions}}</h4>
                    <p class="q-ma-xs" style="line-height:1;"><strong><small>{{currencyName}} OPTIONS</small></strong></p>
                 </div>

                <div style="align-items: center;" class="row justify-center q-mb-md q-pb-xs">
                    <div class="col-xs-5 col-sm-4">
                        OPT’s amount:
                    </div>
                    <div class="col-xs-1"></div>
                    <div class="col-xs-6 col-sm-7">
                        <q-input v-model="sendAmount" type="number" outlined dense />
                    </div>
                </div>
                <div style="align-items: center;" class="row justify-center q-mb-md q-pb-none">
                    <div class="col-xs-5 col-sm-4">
                    </div>
                    <div class="col-xs-1"></div>
                    <div class="col-xs-6 col-sm-7">
                        <q-btn unelevated no-caps outline :disable="!sendAmount && sendAmount > 0 && sendAmount <= liquidOptions" color="primary" v-if="isAuthenticated" @click="submit()">Convert to Tokens</q-btn>

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
  name: 'ConvertOptions',
  data () {
    return {
      sendAmount: null,
      stakeCurrency: process.env.STAKING_CURRENCY,
      currencyName: process.env.CURRENCY_NAME,
    }
  },
  computed: {
    ...mapGetters('freeos', ['liquidOptions', 'isAuthenticated', 'accountName']),
  },
  methods: {
    ...mapActions('freeos', ['convertOptions']),
    async submit () {
      var result = await this.convertOptions({owner: this.accountName, quantity: `${parseFloat(this.sendAmount).toFixed(process.env.TOKEN_PRECISION)} OPTION`})
      console.log('resultR', result)
      this.resetForm()
    },
    resetForm () {
        this.sendAmount = null
    }
  }
}
</script>

<style scoped>

</style>
