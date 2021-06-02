<template>
  <div class="text-center">
    <div v-if="!isFreeosEnabled">
      <b>Freeos system is not currently operational. Please check back later.</b>
    </div>
    <div v-if="isFreeosEnabled">
      <!-- <div class="q-ma-md q-mt-lg">
        {{totalFreeos}} FREEOS
      </div> -->
      <div class="q-ma-md" style="margin-bottom: 60px;">
          <span class="text-bold text-h2">150.00</span> <br/>
          <span class="text-h4">FREEOS</span>
      </div>
    </div>

    <div class="add-bg">
      <div class="add-bg-white">
        <div class="flex justify-between">
          <span class="text-caption">Note: </span>
          <div class="avatar">
            CLAIM
          </div>
          <span class="text-caption flex column">
            <span>Next Claim:</span>
            <span style="color: #00a1ed; margin-top: -5px">Claim Now</span>
          </span>
        </div>

        <div class="q-mt-md">
          Claim now to claim your weekly<br/>
          FREEOS.
        </div>

      </div>
    </div>
    <div v-if="isFreeosEnabled">
      <div class="q-ma-md q-mt-lg" v-if="canClaim">
        Claim now to claim your weekly FREEOS.
        <div>Next Claim: {{daysToNextClaim > 0 ? daysToNextClaim : "NOW!"}}</div>
        <button @click="claim()">CLAIM</button>
      </div>
    </div>
    <div v-if="isFreeosEnabled">
        <!-- <balance class="col-xs-12 col-md-5 row text-left" /> -->
        <balance  />
    </div>
    <div style="width: 300px; margin: 0 auto;">
      <q-btn
        class="add-hover q-mt-sm q-mb-md"
        style="width: 300px; height: 40px; border: 2px solid #00a1ed; border-radius: 8px; color: #00a1ed; width: 100%;"
        >Invite friends and family</q-btn>
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
    ...mapGetters('freeos', ['isFreeosEnabled', 'totalFreeos', 'canClaim'])
  },
  methods: {
    ...mapActions('freeos', ['monitorBlockChain'])
  },
  async mounted () {
    this.monitorBlockChain()
  }
}
</script>

<style lang="scss" scoped>
  .add-bg {
    background: blue;
    padding: 10px;
    position: relative;
    .add-bg-white {

      margin: 0px auto;
      width: 300px;
      height: 150px;
      background: #fff;
      border-radius: 8px;
      padding: 10px 20px;
      .avatar {
        position: absolute;
        top: -30px;
        left: 46.5%;
        width: 80px;
        height: 80px;
        border-radius: 100%;
        background-color: #00a1ed;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        color: #fff;
      }
    }
  }

.add-hover:hover {
  color: #fff !important;
  border: none !important;
  background-color: #f7931e;
  transition: .3s all ease-in-out;
}
</style>
