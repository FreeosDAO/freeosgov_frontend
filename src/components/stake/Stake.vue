<template>
  <div>
    <q-card>
      <q-card-section>
        <div class="text-h5 q-pa-md q-mx-auto" style="width: 70%;">
          Stake {{userStakeRequirement}}
        </div>
        <p>To be eligible to Claim your weekly FREEOS tokens</p>
        <div class="q-ma-md q-mt-lg">
          <q-btn color="primary" :disable="!isMeetStakeMinRequirment()" @click="() => onStake()" no-caps label="Stake" />
        </div>
      </q-card-section>
    </q-card>
    <p class="text-center q-my-lg text-h6">Current Staking Requirement = {{userStakeRequirement}}</p>
    <p v-if="!isMeetStakeMinRequirment()" class="text-negative text-bold">You currently do not have enough XPR to stake.</p>
    <p v-if="!isMeetStakeMinRequirment()">
      Please <router-link :to="{name: 'transfer'}">tranfer</router-link> an additional {{shortageAmount}} in order to claim.
    </p>
  </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import { getAbsoluteAmount, getCurrency } from '@/utils/currency'

export default {
  computed: {
    ...mapState({
      accountName: state => state.account.accountName,
      stakedInfo: state => state.account.claimInfo.stakedInfo,
      respStakeRequirement: state => state.account.claimInfo.respStakeRequirement
    }),
    ...mapGetters('account', ['claimInfo']),
    userStakeRequirement () {
      if (!this.stakedInfo) {
        return ''
      }
      let accountType = parseInt(this.stakedInfo.account_type, 2)
      const string = 'abcdefghijklmnopqrstuvwxyz'
      accountType = string.charAt(accountType - 1)
      if (!accountType) {
        return ''
      }
      let requirement = null
      for (const [key, value] of Object.entries(this.respStakeRequirement)) {
        const requirementType = key.split('_')
        if (requirementType[1] === accountType) {
          requirement = value
          break
        }
      }
      return requirement
    },
    shortageAmount () {
      const currency = getCurrency(this.claimInfo.liquidInAccount.balance)
      const amount = getAbsoluteAmount(this.userStakeRequirement) - getAbsoluteAmount(this.claimInfo.liquidInAccount.balance)
      return `${amount} ${currency}`
    }
  },
  methods: {
    ...mapActions('stake', ['actionStake']),
    ...mapActions('account', ['getAccountInfo']),
    async onStake () {
      const data = {
        accountName: this.accountName,
        amount: this.userStakeRequirement
      }
      await this.actionStake(data)
      this.getAccountInfo()
    },
    isMeetStakeMinRequirment () {
      return getAbsoluteAmount(this.claimInfo.liquidInAccount.balance) >= getAbsoluteAmount(this.userStakeRequirement)
    }
  }
}
</script>
