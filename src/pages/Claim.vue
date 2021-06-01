<template>
  <div class="text-center">
    <div v-if="!isFreeosEnabled">
      <b>Freeos system is not currently operational. Please check back later.</b>
    </div>
    <div v-if="isFreeosEnabled">
      <div class="q-ma-md q-mt-lg">
        {{totalFreeos}} FREEOS
      </div>
    </div>
    <div v-if="isFreeosEnabled">
      <div class="q-ma-md q-mt-lg" v-if="canClaim">
        Claim now to claim your weekly FREEOS.
        <div>Next Claim: {{daysToNextClaim > 0 ? daysToNextClaim : "NOW!"}}</div>

        <button @click="claim()">CLAIM</button>
      </div>
      <div class="q-ma-md q-mt-lg" v-if="!canClaim">

        Saying of the week: Remember you are braver than you belive. Stronger than you seem,
        smarter than you think and loved more than you know.

      </div>
    </div>
    <div v-if="isFreeosEnabled">
        <balance class="col-xs-12 col-md-5 row text-left" />
    </div>
    <div>
      <button>Invite friends and family</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { FreeosBlockChainState } from '../services/FreeosBlockChainState'
import Balance from 'components/accountManagement/Balance'

export default {
  name: 'Claim',
  data () {
    return {
      
    }
  },
  components: {
    Balance
  },
  computed: {
    ...mapGetters('freeos', ['isFreeosEnabled','totalFreeos','canClaim']),
  },
  methods: {
    ...mapActions('freeos', ['monitorBlockChain']),
  },
  async mounted() {
    this.monitorBlockChain();
  }
}
</script>
