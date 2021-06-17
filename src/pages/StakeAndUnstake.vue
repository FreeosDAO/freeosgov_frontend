<template>
<div class="q-pa-md">
    <div class="q-gutter-y-md q-mx-auto" style="max-width: 600px">

        <div class="panel-wrap">
            <q-card class="panel  q-pa-lg">

                <div class="text-h4 text-center q-ma-lg">Staking Requirement</div>
                <p class="text-center">With FREEOS you need a minimum
amount in your account to Claim. For
more info, click here.</p>

                <p class="text-center">In order to Claim your weekly FREEOS tokens, you need to stake </p>
                    <h4 class="text-center text-h5 q-ma-xs q-mb-lg" style="line-height:1;">{{stakeRequirement}}XPR</h4>



                <div class="panel panel-strong q-pa-lg text-center q-mb-lg q-pa-lg" v-if="XPRBalance >= stakeRequirement">
                    <p class="q-mb-sm text-subtitle1" style="line-height:1.2;"><strong>Your current FREEOS OPTIONS balance is:</strong></p>
                    <h4 class="text-h5 q-ma-xs" style="line-height:1;">{{XPRBalance}}</h4>
                    <p class="q-ma-xs" style="line-height:1;"><strong><small>FREEOS OPTIONS</small></strong></p>
                </div>

                <div class="panel panel-warning q-pa-lg text-center q-mb-lg q-pa-lg" v-if="XPRBalance < stakeRequirement">
                    <p class="q-mb-md text-h4 text-warning" style="line-height:1.2;">Warning</p>
                    <p class="q-mb-sm text-subtitle1" style="line-height:1.2;"><strong>We see your balance is short on XPR You need to transfer the following to</strong></p>
                    <h4 class="text-h5 q-ma-xs" style="line-height:1;">{{stakeRequirement - XPRBalance}} XPR</h4>
                    <q-btn href="https://www.protonswap.com/swap" class="q-mt-md" unelevated no-caps outline color="primary">Get XPR via ProtonSwap</q-btn>
                </div>



                <div style="align-items: center;" class="row justify-center q-mb-md q-pb-xs">
                        <q-btn unelevated no-caps outline size="lg" :disable="!userMeetsStakeRequirement" color="primary" v-if="isAuthenticated" @click="submit()">Stake</q-btn>
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
    name: 'Stake',
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters('freeos', ['accountName', 'XPRBalance', 'liquidFreeos', 'isAuthenticated', 'stakeRequirement', 'userHasStaked', 'userStake', 'userMeetsStakeRequirement']),
    },
    methods: {
        ...mapActions('freeos', ['fetch', 'transfer']),
        async submit() {
            var result = await this.stake();
            console.log('resultR', result)
        },
    }
}
</script>

<style scoped>

</style>
