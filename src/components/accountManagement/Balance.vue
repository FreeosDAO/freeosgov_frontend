<template>
  <div>
    <div class="balance q-pl-md q-pr-md q-pt-lg q-pb-sm">
      <div class="flex justify-between q-mb-md" style="width: 100%">
        <div class="flex items-center text-subtitle1 text-weight-bold">
          <span class="small-icon"></span>
          Liquid XPR: </div>
        <div class="text-weight-bold">{{liquidOptions || '0'}}</div>
      </div>

      <div class="flex justify-between q-mb-md">
       <div class="flex items-center text-subtitle1 text-weight-bold">
          <span class="small-icon"></span>
          Staked XPR: </div>
        <div class="text-weight-bold">{{userStake || '0'}}</div>
      </div>

      <div class="flex justify-between q-mb-md">
        <div class="flex items-center text-subtitle1 text-weight-bold" style="color: #00a1ed">
          <span class="small-icon"></span>
          Liquid FREEOS: </div>
        <div class="col-5 text-primary text-weight-bold">{{liquidFreeos || '0'}}</div>
      </div>

      <div class="flex justify-between text-weight-bold q-mb-md">
        <div class="flex items-center text-subtitle1 text-weight-bold">
          <span class="small-icon"></span>
          Vested FREEOS: </div>
        <div class="text-left">{{vestedOptions || '0'}}</div>
        <q-btn
        class="add-hover q-mt-lg"
        style="width: 300px; height: 40px; border: 2px solid #00a1ed; border-radius: 8px; color: #00a1ed"
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
    ...mapGetters('freeos', ['liquidOptions', 'userStake', 'liquidFreeos', 'totalFreeos','canUnvest','vestedOptions'])
  },
  methods: {
    ...mapActions({
      unvest: 'freeos/unVest',
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
  width: 300px;
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
