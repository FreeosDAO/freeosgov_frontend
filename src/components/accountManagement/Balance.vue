<template>
<div>
    <div class="balance bg-white panel-wrap panel-top-total q-pa-lg q-mt-lg">
        <!--<div v-if="(!this.userHasStaked && !this.airkeyBalance) || this.userStake > 0" class="flex justify-between q-mb-md" style="width: 100%">
            <div class="flex items-center text-h6">
                Liquid {{stakeCurrency}}:
                <q-btn class="small-icon q-mt-sm q-ml-sm">
                    <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                        This is your freely transferable {{stakeCurrency}}
                    </q-tooltip>
                </q-btn>

            </div>
            <div class=" text-h6">{{XPRBalance || '0'}}</div>
        </div>-->

       <!--<div v-if="(!this.userHasStaked && !this.airkeyBalance) || this.userStake > 0" class="flex justify-between q-mb-md">
            <div class="flex items-center text-h6">
                Staked {{stakeCurrency}}:                 
                <q-btn class="small-icon q-mt-sm q-ml-sm">
                    <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                         This {{stakeCurrency}} is held for collateral to allow for claiming
                    </q-tooltip>
                </q-btn>
            </div>
            <div class="text-h6">{{userStake || '0'}}</div>
        </div>-->


        <div class="flex justify-between q-mb-md">
            <div class="flex items-center  text-h5">
               Locked Points:
            </div>
            <div class="col-5 text-h5">{{user.lockedBalance || '0'}}</div>
        </div>
        <div class="flex">
            <small class="q-mr-auto">For more info on Locked Points <router-link to="/info#vested-options">click here</router-link></small>
        </div>
        <q-btn v-if="systemRow.unlockpercent > 0" v-bind:disabled="user.record.last_unlock == currentIteration" class="q-mt-lg" unelevated no-caps size="lg" outline @click="submit()" color="primary">
            <span>Unlock<span> {{systemRow.unlockpercent || 0}}%</span></span>
        </q-btn>
        <CompleteDialog  ref="complete"  />
    </div>
</div>
</template>

<script>
import {
    mapGetters,
    mapState,
    mapActions
} from 'vuex'
import BalanceVest from './BalanceVest'
import CompleteDialog from 'src/components/CompleteDialog.vue'
export default {
    computed: {
        ...mapGetters('freeos', ['user', 'systemRow', 'currentIteration', 'accountName']),
        unlockedAmount:function(){
            var unlockedAmount = this.user.lockedBalance && this.systemRow.unlockpercent ? Math.ceil((this.systemRow.unlockpercent / 100) * this.user.lockedBalance) : 0;
            return unlockedAmount;
        }
    },
    methods: {
        ...mapActions('freeos', ['unlock']),
        async submit() {
            var result = await this.unlock();
              if(!(result instanceof Error)){
                this.$refs.complete.openDialog({
                  title: "Unlocked", subtitle: "You Unlocked", value: this.unlockedAmount, currency: "Points"
                });
              }
        },
    },
    components: {
        BalanceVest,
        CompleteDialog
    }

}
</script>

<style lang="scss" scoped>

.balance {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    flex-wrap: wrap;
    margin: 45px auto 20px;

    .small-icon {
        display: block;
        width: 18px;
        height: 18px;
        background-image: url(../../assets/exclamation-small-icon.svg);
        background-repeat: no-repeat;
        margin-right: 5px;
    }

    .add-hover:hover {
        color: #fff !important;
        border: none !important;
        background-color: #f7931e;
        transition: .3s all ease-in-out;
    }
}
</style>
