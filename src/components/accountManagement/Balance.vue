<template>
  <div>
    <div class="balance q-pt-lg q-pl-lg q-pr-lg q-pb-xs">
      <div class="flex justify-between q-mb-md" style="width: 100%">
        <div class="flex items-center text-h6 text-weight-bold">
          <q-btn class="small-icon">
              <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                <strong>
                  This is tool tip,,
                </strong>
              </q-tooltip>
            </q-btn>
          Liquid XPR: </div>
        <div class=" text-h6">{{XPRBalance || '0'}}</div>
      </div>

      <div class="flex justify-between q-mb-md">
       <div class="flex items-center text-h6 text-weight-bold">
            <q-btn class="small-icon">
              <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                <strong>
                  This is tool tip,,
                </strong>
              </q-tooltip>
            </q-btn>
          Staked XPR: </div>
        <div class="text-weight-bold  text-h6">{{userStake || '0'}}</div>
      </div>

      <div class="flex justify-between q-mb-md">
        <div class="flex items-center text-h6 text-weight-bold" style="color: #00a1ed">
          <q-btn class="small-icon">
              <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                <strong>
                  This is tool tip,,
                </strong>
              </q-tooltip>
            </q-btn>
          Liquid FREEOS: </div>
        <div class="col-5 text-primary text-h6">{{liquidFreeos || '0'}}</div>
      </div>

      <!--<div class="flex justify-between q-mb-md">
        <div class="flex items-center text-subtitle1 text-weight-bold" style="color: #00a1ed">
          <span class="small-icon"></span>
          Liquid Options: </div>
        <div class="col-5 text-primary text-weight-bold">{{liquidOptions || '0'}}</div>
      </div>-->

      <div class="flex justify-between text-weight-bold q-mb-md">
        <div class="flex items-center  text-h6">
          <q-btn class="small-icon">
              <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                <strong>
                  This is tool tip,,
                </strong>
              </q-tooltip>
            </q-btn>
          Vested FREEOS: </div>
        <div class="text-left  text-h6">{{vestedOptions || '0'}}</div>
        <q-btn
        unelevated 
        no-caps
        size="lg"
        outline
         color="primary"
        v-if="canUnvest"
        >Unvest</q-btn>
      </div>

    </div>
        <!-- <balance-vest /> -->
  </div>
</template>
<script>
import { mapGetters, mapState, mapActions } from 'vuex'
import BalanceVest from './BalanceVest'
export default {
  computed: {
    ...mapGetters('freeos', ['XPRBalance', 'liquidOptions', 'userStake', 'liquidFreeos', 'totalFreeos', 'canUnvest', 'vestedOptions'])
  },
  methods: {
    ...mapActions({
      unvest: 'freeos/unVest'
    })
  },
  components: {
    BalanceVest
  }

}
</script>

<style scoped lang="scss">
.balance {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin: 15px auto;
  background-color: white;
  border-radius: 8px;
  width:360px;
  border: 2px solid #e5e5e5;

  .small-icon {
    display: block;
    width: 20px;
    height: 20px;
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
