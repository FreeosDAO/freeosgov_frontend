<template>
  <div class="text-center q-pa-lg">
    <div class="text-h4 text-weight-medium q-mb-md">Welcome to <br/>freeos AirClaim</div>
    <div class="text-h6 text-weight-regular">
      <div class="text-subtitle1 q-mb-xl q-mt-xl">
        It's easy to access the Freeos economic system here
      </div>
      <div class="q-mt-sm q-mb-sm">
        <q-btn
        class="add-hover"
        v-if="!username" @click="connectWallet('anchor')"
        style="width: 300px; height: 40px; border: 2px solid #00a1ed; border-radius: 8px; color: #00a1ed"
        >Connect Wallet</q-btn>
      </div>
      <div class="q-mt-xl" style="">
        <img src="../assets/freeostry.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  name: 'PageIndex',
  methods: {
    ...mapActions('account', ['checkIfLoggedIn', 'connectWallet', 'logout', 'getAccountInfo', 'getClaimDetailInfo'])
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
