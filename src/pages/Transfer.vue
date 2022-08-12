<template>
<div class="q-pa-md">
    <div class="q-gutter-y-md q-mx-auto" style="max-width: 600px">

        <div class="panel-wrap">

            <!--BALANCES-->
            <q-card class="panel q-mb-lg q-pa-lg">
                <div class="text-h4 q-mb-lg text-center">Balances</div>
                <div class="flex justify-between">
                    <div class="col col-auto">
                        <p class="q-mb-xs" style="line-height:1;">
                            <small>FREEOS</small>
                        </p>
                        <AbbreviateNumber :value="user.freeosBalance" />
                    </div>
                    <div class="col col-auto">
                        <p class="q-mb-xs" style="line-height:1;">
                            <small>FREEBI</small>
                        </p>
                        <AbbreviateNumber :value="user.freebiBalance" />
                    </div>
                </div>
            </q-card>

            <!--SEND-->
            <q-card class="panel q-pa-lg">

                <div class="text-h4 text-center">Send Tokens</div>

                <div class="text-center q-pb-lg">
                    <small>For more info <a target="_blank" title="Info on transfers" href="https://docs.freeos.io/d/h/6k0z3-408/43bbcca7c54387a/6k0z3-1402">click here</a>.</small>
                </div>

                <div v-if="user.freeosBalance != zeroBalance || user.freebiBalance != zeroBalance">
                  <div class="row justify-center q-mb-md q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
                      <div class="col-xs-5 col-sm-4">
                          <p class="q-mt-sm q-mb-none">To account:</p>
                      </div>
                      <div class="col-xs-6 col-sm-8">
                          <q-input maxlength="12" required v-model="submitData.to" type="text" outlined dense />
                          <p class="q-mb-none text-grey"><small>Proton account without "@" symbol</small></p>
                      </div>
                  </div>
                  <div class="row justify-center q-mb-md q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
                      <div class="col-xs-5 col-sm-4">
                          <p class="q-mt-sm q-mb-none">Token:</p>
                      </div>
                      <div class="col-xs-6 col-sm-8">
                          <q-select required dense outlined v-model="submitData.token" :options="tokensSelectOptions" />
                      </div>
                  </div>
                  <div class="row justify-center q-mb-md q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
                      <div class="col-xs-5 col-sm-4">
                          <p class="q-mt-sm q-mb-none">Amount:</p>
                      </div>
                      <div class="col-xs-6 col-sm-8">

                        <q-input v-model="submitData.quantity" type="number" required outlined dense novalidate>
                            <q-btn v-if="submitData.token" @click="maxAmount()" class="max-btn" size="sm" unelevated no-caps outline color="secondary">Max</q-btn>
                        </q-input>

                          <p class="q-mb-none text-grey"><small>{{currencyAvailable}}</small></p>
                      </div>
                  </div>
                  <div class="row justify-center q-mb-md q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
                      <div class="col-xs-5 col-sm-4">
                          <p class="q-mt-sm q-mb-none">Memo:</p>
                      </div>
                      <div class="col-xs-6 col-sm-8">
                          <q-input maxlength="256" v-model="submitData.memo" type="text" outlined dense />
                      </div>
                  </div>
                  <div class="text-center q-mt-lg">
                    <q-btn size="lg" class="full-width" unelevated no-caps color="primary" :disable="!submitData.quantity || !submitData.to  || !submitData.token || submitData.quantity > currentMax" @click="submit()">Send</q-btn>
                  </div>
                </div>

                <div v-if="user.freeosBalance == zeroBalance && user.freebiBalance == zeroBalance">
                  <p class="text-center">You don't have any balance to transfer.</p>
                </div>
                  
            </q-card>

            <q-card class="panel q-mt-lg q-pa-lg text-center">

                <div class="text-h4">Receive Tokens</div>

                <div class="text-center q-pb-xs">
                    <small>For more info <a target="_blank" title="Info on transfers" href="https://docs.freeos.io/d/h/6k0z3-408/43bbcca7c54387a/6k0z3-1402">click here</a>.</small>
                </div>  

                <div class="q-mt-md text-center text-h5">@{{accountName}}</div>

                <q-btn @click="protonSwap()" href="https://proton.alcor.exchange/" class="q-mt-lg full-width" unelevated no-caps outline color="primary" v-if="isAuthenticated">Need Tokens? Try Alcor</q-btn>

            </q-card>

        </div>
    </div>
    <CompleteDialog ref="complete" />
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'
import CompleteDialog from 'src/components/CompleteDialog.vue'
import AbbreviateNumber from 'src/components/AbbreviateNumber.vue'

export default {
    name: 'Transfer',
    components:{
    CompleteDialog,
    AbbreviateNumber
},
    data() {
        return {
            stakeCurrency: process.env.STAKING_CURRENCY,
            currencyName: process.env.CURRENCY_NAME,
            submitData: {
                to: null,
                token: null,
                quantity: null,
                memo: '',
                from: null
            },
            isShowApprovedDialog: false,
            isShowFailedDialog: false,
        }
    },
    computed: {
        ...mapGetters('freeos', ['accountName', 'user', 'isAuthenticated']),
        tokensSelectOptions() {
            const types = []
            if (this.user.freebiBalance > 0) {
                types.push('FREEBI')
            }
            if (this.user.freeosBalance > 0) {
                types.unshift('FREEOS')
            }
            this.submitData.token = (this.submitData.token) ? this.submitData.token : types[0]
            return types
        },
        isFormFilled() {
            return !Object.values(this.submitData).some(x => (x === null || x === ''))
        },
        currencyAvailable(){
            if (!this.submitData.token){
                return '';
            }
            //let amount = (this.submitData.token == 'FREEOS') ? this.user.freeosBalance : this.user.freebiBalance;
            return this.currentMax + ' ' + this.submitData.token + ' available to transfer';
        },
        currentMax(){
            if(this.submitData.token === 'FREEBI'){
                return this.user.freebiBalance
            }
            else if(this.submitData.token === 'FREEOS'){
                return this.user.freeosBalance
            }
        },
        zeroBalance(){
            let zero = 0;
            return zero.toFixed(process.env.TOKEN_PRECISION)
        }
    },
    methods: {
        ...mapActions('freeos', ['fetch', 'transfer']),
        maxAmount(){
            this.submitData.quantity = this.currentMax
        },
        async submit() {
            var dataToSubmit = Object.assign({}, this.submitData)
            dataToSubmit.from = this.accountName;
            dataToSubmit.quantity = `${parseFloat(this.submitData.quantity).toFixed(process.env.TOKEN_PRECISION)} ${this.submitData.token}`
                        console.log('dataToSubmit', dataToSubmit)
            
            var result = await this.transfer(dataToSubmit)

            if (!(result instanceof Error)) {
                this.$refs.complete.openDialog({
                    title: "Woohoo", subtitle: "Your transfer to "+dataToSubmit.to+" was successful!", value: dataToSubmit.quantity, currency: dataToSubmit.token
                });
            }
            this.resetForm()

        },
        resetForm() {
            this.submitData = {
                to: null,
                token: null,
                quantity: null,
                memo: '',
                from: null
            }
        },
        protonSwap() {
            window.open("https://proton.alcor.exchange/", '_blank');
        },
    }
}
</script>