<template>
<div class="q-pa-md">
    <div class="q-gutter-y-md q-mx-auto" style="max-width: 600px">

        <div class="panel-wrap">

            <q-card class="panel q-mb-lg">

                <!--BALANCES-->
                <section class="q-pa-lg">
                    <div class="text-primary text-subtitle1 text-bold text-center q-pb-sm">Your current balances:</div>
                    <div class="balance-list">
                        <div class="q-mb-sm q-mr-xs q-ml-xs bg-info text-center">
                            <div class="text-bold text-subtitle1 font-bold" style="line-height:1;"><AbbreviateNumber :value="user.freeosBalance" /></div>
                            <div class="text-bold text-primary">{{currencies.freeos}}</div>
                        </div>
                        <div class="q-mb-sm q-mr-xs q-ml-xs bg-info text-center">
                            <div class="text-bold text-subtitle1 font-bold" style="line-height:1;"><AbbreviateNumber :value="user.freebiBalance" /></div>
                            <div class="text-bold text-primary">{{currencies.freebi}}</div>
                        </div>
                    </div>
                </section>

                <!--TABS-->
                <div class="flex justify-center" style="flex-direction:row;">
                    <q-btn class="tab-btn" v-bind:class="{ 'tab-btn--unselected': !isFreeosTabSelected }" outline unelevated no-caps
                    @click="isFreeosTabSelected = !isFreeosTabSelected">Send {{currencies.freeos}}</q-btn>
                    <q-btn class="tab-btn" v-bind:class="{ 'tab-btn--unselected': isFreeosTabSelected }" outline unelevated no-caps
                    @click="isFreeosTabSelected = !isFreeosTabSelected">Send {{currencies.freebi}}</q-btn>
                </div>

                <!--SEND FREEOS-->
                <section v-if="isFreeosTabSelected" class="q-pa-lg tabform">

                    <div class="text-center q-pb-lg q-px-lg">
                        For more info on sending {{currencies.freeos}} <a target="_blank" title="Info on transfers" href="https://docs.freeos.io/d/h/6k0z3-408/43bbcca7c54387a/6k0z3-1402">click here</a>.
                    </div>

                    <div v-if="user.freeosBalance != zeroBalance">
                        <div class="row justify-center q-mb-md q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
                            <div class="col-xs-5 col-sm-4">
                                <p class="q-mt-sm q-mb-none">To account:</p>
                            </div>
                            <div class="col-xs-6 col-sm-8">
                                <q-input maxlength="12" required v-model="freeosData.to" debounce="500" :rules="[validateUsername()]" type="text" outlined dense>
                                    <template v-slot:hint>
                                        <p class="q-mb-none" :class="{'text-grey': toFreeosValidated || toFreeosValidated == null, 'text-red':toFreeosValidated == false }">{{toFreeosMessage}}</p>
                                    </template>
                                </q-input>
                            </div>
                        </div>
                        <div class="row justify-center q-mb-md q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
                            <div class="col-xs-5 col-sm-4">
                                <p class="q-mt-sm q-mb-none">Amount:</p>
                            </div>
                            <div class="col-xs-6 col-sm-8">

                                <q-input v-model="freeosData.quantity" type="number" step="0.0001" required outlined dense novalidate>
                                    <q-btn @click="maxAmount(false, $event)" class="max-btn" size="sm" unelevated no-caps outline color="secondary">Max</q-btn>
                                </q-input>

                                <p class="q-mb-none text-grey"><small>{{currencyAvailable}}</small></p>
                            </div>
                        </div>
                        <div class="row justify-center q-mb-md q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
                            <div class="col-xs-5 col-sm-4">
                                <p class="q-mt-sm q-mb-none">Memo:</p>
                            </div>
                            <div class="col-xs-6 col-sm-8">
                                <q-input maxlength="256" v-model="freeosData.memo" type="text" outlined dense />
                            </div>
                        </div>
                        <div class="text-center q-mt-lg">
                            <q-btn size="lg" class="full-width" unelevated no-caps color="primary" :disable="!canSendFreeos" @click="submit()">Send</q-btn>
                        </div>
                    </div>
                    <div v-if="user.freeosBalance == zeroBalance">
                        <p class="text-center">You don't have any balance to transfer.</p>
                    </div>
                </section>

                <!--SEND FREEBI-->
                <section v-if="!isFreeosTabSelected" class="tabform">

                    <p class="bg-primary text-center text-white q-py-md">
                        <b>{{currencies.freebi}} transfer fee is currently {{freebixfee}}%</b>
                    </p>

                    <div class="text-center q-px-lg">
                        For more info on sending {{currencies.freebi}} <a target="_blank" title="Info on transfers" href="https://docs.freeos.io/d/h/6k0z3-408/43bbcca7c54387a/6k0z3-1402">click here</a>.
                    </div>

                    <div v-if="user.freebiBalance != zeroBalance" class="q-pa-lg">
                        <div class="row justify-center q-mb-md q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
                            <div class="col-xs-5 col-sm-4">
                                <p class="q-mt-sm q-mb-none">To account:</p>
                            </div>
                            <div class="col-xs-6 col-sm-8">
                                <q-input maxlength="12" required v-model="freebiData.to" debounce="500" :rules="[validateFreeosUsername()]" type="text" outlined dense>
                                    <template v-slot:hint>
                                        <p class="q-mb-none" :class="{'text-grey': toFreebiValidated || toFreebiValidated == null, 'text-red':toFreebiValidated == false }">{{toFreebiMessage}}</p>
                                    </template>
                                </q-input>
                            </div>
                        </div>
                        <div class="row justify-center q-mb-md q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
                            <div class="col-xs-5 col-sm-4">
                                <p class="q-mt-sm q-mb-none">Transfer Amount:</p>
                            </div>
                            <div class="col-xs-6 col-sm-8">

                                <q-input v-model="freebiData.quantity" @input="updateFreebiAmount(false)" @change="updateFreebiAmount(false)" type="number" step="0.0001" required outlined dense novalidate>
                                    <q-btn @click="maxAmount(false, $event)" class="max-btn" size="sm" unelevated no-caps outline color="secondary">Max</q-btn>
                                </q-input>

                                <p class="q-mb-none text-grey"><small>{{currencyAvailable}}</small></p>
                            </div>
                        </div>
                        <div class="row justify-center q-mb-md q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
                            <div class="col-xs-5 col-sm-4">
                                <p class="q-mt-sm q-mb-none">Recipient will receive:</p>
                            </div>
                            <div class="col-xs-6 col-sm-8">

                                <q-input v-model="freebiRecipientAmount" type="number" step="0.0001" required outlined dense novalidate disable filled></q-input>

                                <p class="q-mb-none text-grey"><small>Transfer amount minus {{freebixfee}}% transfer fee</small></p>
                            </div>
                        </div>
                        <div class="row justify-center q-mb-md q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
                            <div class="col-xs-5 col-sm-4">
                                <p class="q-mt-sm q-mb-none">Memo:</p>
                            </div>
                            <div class="col-xs-6 col-sm-8">
                                <q-input maxlength="256" v-model="freebiData.memo" type="text" outlined dense />
                            </div>
                        </div>
                        <div v-if="canSendFreebi" class="text-center q-mt-lg">
                            <p class="text-primary text-subtitle1 text-bold text-center q-mb-none">Summary:</p>
                            <p>You will send {{freebiData.quantity}} {{freebiData.token}}.
                                <br> @{{freebiData.to}} will receive {{freebiRecipientAmount}} {{freebiData.token}} after {{freebixfee}}% transfer fee.</p>
                        </div>
                        <div class="text-center q-mt-lg">
                            <q-btn size="lg" class="full-width" unelevated no-caps color="primary" :disable="!canSendFreebi" @click="submit()">Send</q-btn>
                        </div>
                    </div>
                    <div v-if="user.freebiBalance == zeroBalance" class="q-pa-lg">
                        <p class="text-center">You don't have any balance to transfer.</p>
                    </div>
                </section>
                  
            </q-card>


            <!--RECEIVE-->
            <q-card class="panel q-mt-lg q-pa-lg text-center">

                <div class="text-h4">Receive Tokens</div>

                <div class="text-center q-pb-xs">
                    <small>For more info <a target="_blank" title="Info on transfers" href="https://docs.freeos.io/d/h/6k0z3-408/43bbcca7c54387a/6k0z3-1402">click here</a>.</small>
                </div>  

                <div class="q-mt-md text-center text-h5">@{{accountName}}</div>

                <q-btn href="https://proton.alcor.exchange/" target="_blank" class="q-mt-lg full-width" unelevated no-caps outline color="primary" v-if="isAuthenticated">Need Tokens? Try Alcor</q-btn>

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
            isFreeosTabSelected: true,
            currencyName: process.env.CURRENCY_NAME,
            freeosData: {
                to: null,
                token: process.env.CURRENCY_NAME,
                quantity: null,
                memo: '',
                from: null
            },
            freebiData: {
                to: null,
                token: process.env.FREEBI_CURRENCY_NAME,
                quantity: null,
                memo: '',
                from: null
            },
            freebiRecipientAmount: null,
            isShowApprovedDialog: false,
            isShowFailedDialog: false,
            toFreebiValidated: null,
            toFreebiMessage: 'Proton account without "@" symbol',
            toFreeosValidated: null,
            toFreeosMessage: 'Proton account without "@" symbol'
        }
    },
    computed: {
        ...mapGetters('freeos', ['accountName', 'user', 'isAuthenticated', 'dparametersTable', 'currencies']),
        currencyAvailable(){
            return this.currentMax + ' ' + this.currentToken + ' available to transfer';
        },
        currentMax(){
            if(!this.isFreeosTabSelected){
                return this.user.freebiBalance
            }
            else if(this.isFreeosTabSelected){
                return this.user.freeosBalance
            }
        },
        currentMaxTaxed(){
            return this.calcFreebiTaxed(this.user.freebiBalance)
        },
        zeroBalance(){
            let zero = 0;
            return zero.toFixed(process.env.TOKEN_PRECISION)
        },
        currentToken(){
            if(!this.isFreeosTabSelected){
                return this.freebiData.token
            }
            else if(this.isFreeosTabSelected){
                return this.freeosData.token
            }
        },
        currentQuantity(){
            if(!this.isFreeosTabSelected){
                return this.freebiData.quantity
            }
            else if(this.isFreeosTabSelected){
                return this.freeosData.quantity
            }
        },
        freebixfee(){
            let request = this.dparametersTable.filter(function(row){
                return row.paramname == 'freebixfee'
            })
            request = (request.length) ? parseFloat(request[0].value).toFixed(2) : ''
            return request
        },
        canSendFreebi(){
            if (!this.toFreebiValidated || !this.freebiData.quantity || !this.freebiData.to || parseFloat(this.freebiData.quantity) > this.currentMax || parseFloat(this.freebiData.quantity) <= 0){
                return false;
            }
            return true;
        },
        canSendFreeos(){
            if (!this.toFreeosValidated || !this.freeosData.quantity || !this.freeosData.to || parseFloat(this.freeosData.quantity) > this.currentMax || parseFloat(this.freeosData.quantity) <= 0){
                return false;
            }
            return true;
        }
    },
    methods: {
        ...mapActions('freeos', ['fetch', 'transfer', 'isValidUsername', 'isValidFreeosUser']),
        maxAmount(tax = false, event){
            if(!this.isFreeosTabSelected & !tax){
                this.freebiData.quantity = this.currentMax
            }
            else if(!this.isFreeosTabSelected & tax){
                this.freebiRecipientAmount = this.currentMaxTaxed
            }
            else if(this.isFreeosTabSelected){
                this.freeosData.quantity = this.currentMax
            }
            // trigger change event on input
            let input = event.target.closest('.col-xs-6').querySelector('input');
            if(input){
                input.dispatchEvent(new Event('change', {bubbles:true}));
            }
        },
        async submit() {
            var dataToSubmit = (this.isFreeosTabSelected) ? Object.assign({}, this.freeosData) : Object.assign({}, this.freebiData)
            dataToSubmit.from = this.accountName
            dataToSubmit.quantity = `${parseFloat(dataToSubmit.quantity).toFixed(process.env.TOKEN_PRECISION)} ${dataToSubmit.token}`
                        console.log('dataToSubmit', dataToSubmit)
            
            var token = dataToSubmit.token;
            var quantity = (token == this.currencies.freeos) ? dataToSubmit.quantity : this.freebiRecipientAmount;
            var result = await this.transfer(dataToSubmit)

            if (!(result instanceof Error)) {
                this.$refs.complete.openDialog({
                    title: "Woohoo", subtitle: "Your transfer to "+dataToSubmit.to+" was successful!", value: quantity, currency: token
                });
            }
            this.resetForm()

        },
        resetForm() {
            this.freeosData = {
                to: null,
                token: this.currencies.freeos,
                quantity: null,
                memo: '',
                from: null
            }
            this.freebiData = {
                to: null,
                token: this.currencies.freebi,
                quantity: null,
                memo: '',
                from: null
            }
            this.freebiRecipientAmount = null
            this.toFreebiMessage = this.toFreeosMessage = 'Please use a valid Proton account without "@" symbol'
        },
        updateFreebiAmount(tax = false){
            if(tax){
                this.freebiData.quantity = ( this.freebiRecipientAmount / (1 - (this.freebixfee*0.01)) )
            }
            else{
                this.freebiRecipientAmount = this.calcFreebiTaxed(this.freebiData.quantity)
            }
        },
        calcFreebiTaxed(val){
            return (val - this.roundDown(val * (this.freebixfee * 0.01), process.env.TOKEN_PRECISION))//.toFixed(process.env.TOKEN_PRECISION)
        },
        async validateUsername(){
            this.freeosData.to = this.cleanUsername(this.freeosData.to)
            if(this.freeosData.to && this.freeosData.to == this.accountName){
                this.toFreeosValidated = false;
                this.toFreeosMessage = 'Cannot transfer to self'
            }
            else if(this.freeosData.to){
                let res = await this.isValidUsername(this.freeosData.to);
                if(res && this.freeosData.to != this.accountName){
                    this.toFreeosValidated = true
                    this.toFreeosMessage = 'Proton Account is valid'
                }
                else{
                    this.toFreeosValidated = false
                    this.toFreeosMessage = 'Please use a valid Proton account without "@" symbol'
                }
            }
            else{
                this.toFreeosValidated = null
                this.toFreeosMessage = 'Proton account without "@" symbol'
            }
        },
        async validateFreeosUsername(){
            this.freebiData.to = this.cleanUsername(this.freebiData.to)
            if(this.freebiData.to && this.freebiData.to == this.accountName){
                this.toFreebiValidated = false;
                this.toFreebiMessage = 'Cannot transfer to self'
            }
            else if(this.freebiData.to){
                let res = await this.isValidFreeosUser(this.freebiData.to);
                if(res && this.freebiData.to != this.accountName){
                    this.toFreebiValidated = true
                    this.toFreebiMessage = 'Proton Account is valid & registered with Freeos'
                }
                else{
                    this.toFreebiValidated = false
                    this.toFreebiMessage = 'This user is not registered with Freeos'
                }
            }
            else{
                this.toFreebiValidated = null
                this.toFreebiMessage = 'Proton account without "@" symbol'
            }
        },
        cleanUsername(name){
            if(name){
                var regex = /[\W67890]/g;
                return name.replace(regex, '').toLowerCase();
            }
            return name
        },
        roundDown(value, decimals) {
            return Number( Math.floor( value+'e'+decimals ) + 'e-'+decimals );
        },
        round(value, decimals) {
            return Number( Math.round( value+'e'+decimals ) + 'e-'+decimals );
        }
    },
    watch:{
        currentQuantity(val, old){
            if(typeof(val) == 'number'){
                val = this.roundDown(val,process.env.TOKEN_PRECISION) //.toFixed(process.env.TOKEN_PRECISION)
            }
            else if(typeof(val) == 'string'){
                val = this.roundDown(parseFloat(val),process.env.TOKEN_PRECISION)//parseFloat(val).toFixed(process.env.TOKEN_PRECISION)
            }

            if(this.isFreeosTabSelected){
                this.freeosData.quantity = val
            } else if(!this.isFreeosTabSelected){
                this.freebiData.quantity = val
            }
            
        },
        freebiRecipientAmount(val, old){
            if(typeof(val) == 'number'){
                val = this.round(val, process.env.TOKEN_PRECISION).toFixed(process.env.TOKEN_PRECISION)
            }
            else if(typeof(val) == 'string'){
                val = this.round(parseFloat(val), process.env.TOKEN_PRECISION).toFixed(process.env.TOKEN_PRECISION)
            }
            
            this.freebiRecipientAmount = val
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
.tabform{
    border-top: 1px solid gray
}
</style>
<style>
label.q-field .q-field__bottom{
    padding-left: 0 !important
}
</style>