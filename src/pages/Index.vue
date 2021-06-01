<template>
  <div class="text-center q-pa-lg">
    <div class="text-h4 text-weight-medium q-mb-md">Welcome to freeos AirClaim</div>
    <div class="text-h6 text-weight-regular">
      <div>
        It's easy to access the Freeos economic system here
      </div>
      <div class="q-mt-sm q-mb-sm">
        <q-btn no-caps flat v-if="!username" @click="connectWallet('anchor')">Connect Wallet</q-btn>        
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'PageIndex',
  methods: {
      ...mapActions('account', ['checkIfLoggedIn', 'connectWallet', 'logout', 'getAccountInfo', 'getClaimDetailInfo']),
  }
}
</script>
  