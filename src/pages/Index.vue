<template>
  <div class="text-center q-pa-lg">
    <div class="text-h3 text-weight-medium q-mb-none">Welcome to the</div>
    <div class="text-h3 text-weight-medium text-primary q-mb-md">Freeos AirClaim</div>

    <div class="text-weight-regular">
      <div class="text-h5 q-mb-xl q-mt-xl">
        Access the Freeos Economic System here:
      </div>
      <div class="q-mt-xs q-mb-sm">
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
    ...mapGetters('account', ['isAuthenticated'])
  },
  methods: {
    ...mapActions('account', ['checkIfLoggedIn', 'connectWallet', 'logout', 'getAccountInfo', 'getClaimDetailInfo']),
    ...mapActions('freeos', ['fetch'])
  },
  async created () {
    var result = await this.fetch();
  },
  async mounted () {
    if (this.isAuthenticated) {
      console.log('this.$route.query', this.$route.query.returnUrl)
      if( this.$route.query.returnUrl){
        this.$router.push({ path: this.$route.query.returnUrl })
      }else{
        this.$router.push({ path: '/claim' })
      }
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
