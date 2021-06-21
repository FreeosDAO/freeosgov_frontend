<template>
<div class="q-pa-md">
    <div class="q-gutter-y-md q-mx-auto" style="max-width: 600px">

        <div class="panel-wrap">
            <q-card class="panel  q-pa-lg">

                <div class="text-h4 text-center q-ma-lg">Staking Requirement</div>

                <div v-if="!bcUnstaking">
                    <p class="text-center">With FREEOS you need a minimum
                        amount in your account to Claim. For
                        more info, click here.</p>

                    <p class="text-center">In order to Claim your weekly FREEOS tokens, you need to stake </p>
                    <h4 class="text-center text-h5 q-ma-xs q-mb-lg" style="line-height:1;">{{stakeRequirement}} XPR</h4>
                </div>

                <div class="panel panel-warning q-pa-lg text-center q-mb-lg q-pa-lg" v-if="bcUnstaking">
                    <p class="q-mb-md text-h4 text-warning" style="line-height:1.2;">Warning</p>
                    <p class="q-mb-sm text-subtitle1" style="line-height:1.2;"><strong>You have unstaked</strong></p>
                    <h4 class="text-h5 q-mt-xs q-mb-mb" style="line-height:1;">{{stakeRequirement}} XPR</h4>
                    <p class="q-mb-md text-subtitle1" style="line-height:1.2;">Your are currently NOT eligiable to Claim your weekly FREEOS. You need a minimum {{stakeRequirement}} XPR to Claim. This can be rectified by vancelling the process if you wish</p>
                    <p class="q-mb-lg text-subtitle1" style="line-height:1.2;">You are currently unstaking {{stakeRequirement}} XPR. The unstaking will complete <strong class="text-primary"> {{stakeIterationMsg}}</strong></p>

                    <q-btn unelevated outline :disable="XPRBalance < stakeRequirement" color="primary" v-if="isAuthenticated" @click="cancelSubmit()">Cancel Unstaking</q-btn>

                </div>

                <div class="panel panel-warning q-pa-lg text-center q-mb-lg q-pa-lg" v-if="XPRBalance < stakeRequirement && !userHasStaked">
                    <p class="q-mb-md text-h4 text-warning" style="line-height:1.2;">Warning</p>
                    <p class="q-mb-sm text-subtitle1" style="line-height:1.2;"><strong>We see your balance is short on XPR You need to transfer the following to</strong></p>
                    <h4 class="text-h5 q-ma-xs" style="line-height:1;">{{stakeRequirement - XPRBalance}} XPR</h4>
                    <q-btn href="https://www.protonswap.com/swap" class="q-mt-md" unelevated no-caps outline color="primary">Get XPR via ProtonSwap</q-btn>
                </div>

                <div class="panel panel-info q-pa-lg text-center q-mb-lg q-pa-lg" v-if="userHasStaked && !bcUnstaking">

                    <p class="q-mb-md text-h4" style="line-height:1.2;">U've Staked</p>

                    <p class="q-mb-sm text-subtitle1" style="line-height:1.2;">You've Staked so you can Claim, you've currently staked:</p>
                    <h4 class="text-h5 q-ma-xs" style="line-height:1;">{{userStake}} XPR</h4>
                </div>

                <div class="panel panel-info q-pa-lg text-center q-mb-lg q-pa-lg" v-if="XPRBalance >= stakeRequirement && !userHasStaked">

                    <p class="q-mb-md text-h4" style="line-height:1.2;">Threshold Filling</p>

                    <p class="q-mb-sm text-subtitle1" style="line-height:1.2;">You currently have more than enough staked in your account to Claim your weekly FREEOS. Current balance:</p>
                    <h4 class="text-h5 q-ma-xs" style="line-height:1;">{{XPRBalance}} XPR</h4>
                </div>

                <div class="panel panel-warning q-pa-lg text-center q-mb-lg q-pa-lg" v-if="XPRBalance < stakeRequirement">
                    <p class="q-mb-md text-h4 text-warning" style="line-height:1.2;">Warning</p>
                    <p class="q-mb-sm text-subtitle1" style="line-height:1.2;"><strong>We see your balance is short on XPR You need to transfer the following to</strong></p>
                    <h4 class="text-h5 q-ma-xs" style="line-height:1;">{{stakeRequirement - XPRBalance}} XPR</h4>
                    <q-btn href="https://www.protonswap.com/swap" class="q-mt-md" unelevated no-caps outline color="primary">Get XPR via ProtonSwap</q-btn>
                </div>

                <div class="panel panel-warning q-pa-lg text-center q-mb-lg q-pa-lg" v-if="userHasStaked && !bcUnstaking">
                    <p class="q-mb-md text-h4" style="line-height:1.2;">Unstake</p>
                    <p class="q-mb-md text-subtitle1" style="line-height:1.2;"><strong>This process takes {{stakeIterationMsg}} days</strong> also if you unstake you will NOT be eligiable to Claim your weekly FREEOS. </p>
                    <div style="align-items: center;" class="row justify-center q-mb-sm q-pb-xs" v-if="userHasStaked">
                        <q-btn unelevated outline color="primary" v-if="isAuthenticated" @click="unstakeSubmit()">Unstake</q-btn>
                    </div>

                </div>

                <div style="align-items: center;" class="row justify-center q-mb-md q-pb-xs" v-if="!userHasStaked">
                    <q-btn unelevated outline size="lg" :disable="XPRBalance < stakeRequirement" color="primary" v-if="isAuthenticated" @click="stakeSubmit()">Stake</q-btn>
                </div>

            </q-card>

        </div>

    </div>
</div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'

export default {
    name: 'Stake',
    data() {
        return {
            countdown: 1
        }
    },
    computed: {
        ...mapGetters('freeos', ['accountName', 'bcUnstaking', 'XPRBalance', 'liquidFreeos', 'isAuthenticated', 'stakeRequirement', 'userHasStaked', 'userStake', 'userMeetsStakeRequirement', 'currentIteration','unstakingIteration']),
      stakeIterationMsg () {

        //Handle
        if(this.unstakingIteration && this.currentIteration && this.unstakingIteration === this.currentIteration.iteration_number){
              return new Date(this.currentIteration.end).toString().split(new Date(this.currentIteration.end).getFullYear())[0];
        }else{
            return "soon"
        }

      }
   },
    created(){
      this.setCountdown();
    },
    methods: {
        ...mapActions('freeos', ['fetch', 'stake', 'unstake', 'cancelUnstake']),
        async stakeSubmit() {
            var result = await this.stake(this.stakeRequirement)
            console.log('resultR', result)
        },
        async unstakeSubmit() {
            var result = await this.unstake()
            console.log('resultR', result)
        },
        async cancelSubmit() {
            var result = await this.cancelUnstake()
            console.log('cancelUnstake', result)
        },
        setCountdown(){
            const t = this;
            const dateEnd =  Math.floor(Date.parse(this.currentIteration.end + "Z") / 1000);

            setInterval(function(){
               const currentTimeStamp = Math.floor(Date.parse(new Date().toISOString()) / 1000);
               t.countdown = t.secondsToDhms(dateEnd - currentTimeStamp);
            }, 1000);

        },
        secondsToDhms(seconds) {
            seconds = Number(seconds);
            var d = Math.floor(seconds / (3600 * 24));
            var h = Math.floor(seconds % (3600 * 24) / 3600);
            var m = Math.floor(seconds % 3600 / 60);
            var s = Math.floor(seconds % 60);

            var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
            var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
            var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
            var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
            return dDisplay + hDisplay + mDisplay + sDisplay;
        }
    }
}
</script>

<style scoped>

</style>
