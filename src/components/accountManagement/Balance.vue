<template>
  <div>
    <div class="col-xs-3"></div>
    <div class="col-xs-8">
      <div class="row">
        <div class="col-5">Liquid XPR: </div>
        <div class="col-5 text-primary text-weight-bold">{{liquidOptions || '0'}}</div>
      </div>
      <q-separator class="q-mt-sm q-mb-sm" />
      <div class="row">
        <div class="col-5">Staked XPR: </div>
        <div class="col-5 text-primary text-weight-bold">{{userStake || '0'}}</div>
      </div>
      <q-separator class="q-mt-sm q-mb-sm" />
      <div class="row">
        <div class="col-5">Liquid FREEOS: </div>
        <div class="col-5 text-primary text-weight-bold">{{liquidFreeos || '0'}}</div>
      </div>
      <q-separator class="q-mt-sm q-mb-sm" />
      <balance-vest />
      <q-separator class="q-mt-sm q-mb-sm" />
      <div class="row text-green text-weight-bold">
        <div class="col-5">Total FREEOS: </div>
        <div class="col-5">{{totalFreeos || '0'}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import BalanceVest from './BalanceVest'
export default {
  computed: {
    ...mapGetters('freeos', ['liquidOptions', 'userStake', 'liquidFreeos', 'totalFreeos'])
  },
  components: {
    BalanceVest
  }
}
</script>
