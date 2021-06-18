<template>
  <div class="text-center q-pa-lg">
    <div class="text-h3 text-weight-medium q-mb-md">Welcome to <br/>freeos AirClaim</div>
    <div class="text-weight-regular">
      <div class="text-subtitle1 q-mb-xl q-mt-xl">
        It's easy to access the Freeos economic system here
      </div>
      <div class="q-mt-sm q-mb-sm">
        <q-btn
        unelevated
        no-caps
        size="lg"
        outline
         color="primary"
        v-if="!isAuthenticated" @click="connectWallet('anchor')"
        >Connect Wallet</q-btn>
      </div>
      <div class="q-mt-xl" style="">
        <img src="../assets/join-screen-image.svg" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'PageIndex',
  computed: {
    ...mapState({
      accountName: state => state.account.accountName,
      iterationNumber: state => state.calendar.currentIteration.iteration_number
    }),
    ...mapGetters('account', ['isAuthenticated', 'connecting'])
  },
  methods: {
    ...mapActions('account', ['checkIfLoggedIn', 'connectWallet', 'logout', 'getAccountInfo', 'getClaimDetailInfo'])
  },
  mounted () {
    if (this.isAuthenticated) {
      this.$router.push({ path: '/claim' })
    }
  }
}
</script>
<style>
.q-focus-helper {
  display: none;
}
.add-hover {
  transition: .3s all ease-in-out;
}

.add-hover:hover {
  color: #fff !important;
  border: none !important;
  background-color: #f7931e;
  transition: .3s all ease-in-out;
}
</style>
