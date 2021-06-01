<template>
  <div class="text-center q-mx-auto" style="max-width: 1000px;">
    <div class="row full-width justify-around">
      <div class="col-xs-10 col-sm-5 q-mb-lg" v-if="!stakedInfo">
        <q-btn
          color="primary"
          label="register"
        @click="registerUser()" />
        <p><small>(you are not register yet)</small></p>
      </div>
      <div class="col-xs-10 col-sm-5 q-mb-lg" v-else-if="!stakedValue">
        <stake-card v-if="userCanStake"/>
      </div>
      <div class="col-xs-10 col-sm-5 q-mb-lg" v-else-if="stakedValue">
        <unstake-card />
      </div>
    </div>
    <unstake-status v-if="stakeStatus === 'unStaking' "/>
  </div>
</template>

<script>
import StakeCard from 'components/stake/Stake'
import UnstakeCard from 'components/stake/Unstake'
import UnstakeStatus from 'components/stake/UnstakeStatus'
import { mapState, mapActions } from 'vuex'
import { getAbsoluteAmount } from '@/utils/currency'
export default {
  name: 'StakeAndUnstake',
  data () {
    return {
      stakeStatus: null
    }
  },
  components: {
    StakeCard,
    UnstakeCard,
    UnstakeStatus
  },
  computed: {
    ...mapState({
      stakedInfo: state => state.account.claimInfo.stakedInfo,
      liquidInAccount: state => state.account.claimInfo.liquidInAccount,
      accountName: state => state.account.accountName
    }),
    stakedValue () {
      return getAbsoluteAmount(this.stakedInfo.stake) > 0
    }
  },
  methods: {
    ...mapActions('stake', ['onRegisterUser']),
    ...mapActions('account', ['getAccountInfo']),
    userCanStake () {
      if (getAbsoluteAmount(this.liquidInAccount.balance) > 0) {
        return true
      } else {
        return false
      }
    },
    async registerUser () {
      await this.onRegisterUser(this.accountName)
      this.getAccountInfo()
    }
  }
}
</script>
