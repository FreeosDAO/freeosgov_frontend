<template>
<div>
    <div class="balance bg-white panel-wrap panel-top-total q-pa-lg q-mt-lg">
        <div class="flex justify-between q-mb-md">
            <div class="flex items-center  text-h5">
               Locked {{currencies.point}}S:
            </div>
            <AbbreviateNumber :value="user.lockedBalance" classes="col-5 text-h5" />
        </div>
        <div class="flex">
            <small class="q-mr-auto">For more info on Locked {{currencies.point}}S <a target="_blank" :title="'Info on Locked '+currencies.point+'S'" href="https://docs.freeos.io/d/h/6k0z3-408/43bbcca7c54387a/6k0z3-1462">click here</a></small>
        </div>
        <q-btn v-bind:disabled="!canUnlock" class="q-mt-lg" unelevated no-caps size="lg" outline @click="submit()" color="primary">
            <span>Unlock<span> {{systemRow.unlockpercent || 0}}%</span></span>
        </q-btn>
        <div v-if="!canUnlock" class="flex">
            <small class="q-mt-sm q-mb-none q-mr-auto">Your {{currencies.point}}S cannot be unlocked. For more info <a target="_blank" :title="'Info on Locked '+currencies.point+'S'" href="https://docs.freeos.io/d/h/6k0z3-408/43bbcca7c54387a/6k0z3-1482">click here.</a></small>
        </div>
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
import CompleteDialog from 'src/components/CompleteDialog.vue'
import { user } from 'src/store/freeos/getters';
import AbbreviateNumber from './AbbreviateNumber.vue';

export default {
    computed: {
        ...mapGetters('freeos', ['user', 'systemRow', 'currentIteration', 'accountName', 'currencies']),
        unlockedAmount:function(){
            var unlockedAmount = 0; 
            
            if(this.user.lockedBalance && this.systemRow.unlockpercent){

                unlockedAmount = Math.ceil((this.systemRow.unlockpercent / 100) * this.user.lockedBalance);

                if(unlockedAmount > this.user.lockedBalance){
                    unlockedAmount = this.user.lockedBalance;
                }
            }
            return unlockedAmount;
        },
        canUnlock(){
            // if unlock percent higher than 0
            if(this.systemRow.unlockpercent <= 0){
                return false;
            }

            // if user last unlock is same as this iteration
            if(this.user.lastUnlock){
                if(this.user.lastUnlock.iteration_number == this.currentIteration){
                    return false;
                }
            }
            
            // if user does not have points
            if(!this.user.lockedBalance){
                return false; 
            }

            return true;
        }
    },
    methods: {
        ...mapActions('freeos', ['unlock']),
        async submit() {
            var result = await this.unlock();
              if(!(result instanceof Error)){
                this.$refs.complete.openDialog({
                  title: "Unlocked", subtitle: "You Unlocked", value: this.unlockedAmount, currency: this.currencies.point
                });
              }
        },
    },
    components: {
    CompleteDialog,
    AbbreviateNumber
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
        background-image: url(../assets/exclamation-small-icon.svg);
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
