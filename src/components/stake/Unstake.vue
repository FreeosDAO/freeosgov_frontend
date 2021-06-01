<template>
  <q-card>
    <q-card-section class="text-center">
      <div class="text-h5 q-pa-md q-mx-auto">
        Unstake {{stakedAmount}}
      </div>
      <div class="text-h5 text-uppercase text-bold text-red-5">
        WARNING!
      </div>
      <p class="text-red-5">You will be unable to Claim further FREEOS tokens<br />
        Unstaking will take 10 days
      </p>
      <div class="q-ma-md q-mt-lg">
        <q-btn color="primary" no-caps label="Unstake" @click="onUnstake()" />
      </div>
    </q-card-section>
  </q-card>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState({
      accountName: state => state.account.accountName
    }),
    ...mapGetters('account', ['claimInfo']),
    stakedAmount () {
      return this.claimInfo.stakedInfo.stake
    }
  },
  methods: {
    ...mapActions('unstake', ['actionUnstake']),
    ...mapActions('account', ['getAccountInfo']),
    async onUnstake () {
      await this.actionUnstake(this.accountName)
      this.getAccountInfo()
    }
  }
}
</script>
