<template>
  <div class="text-center relative">
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

    <div class="box">
      <div class="flex justify-end q-pr-md q-mt-lg">
        <q-icon class="cursor-pointer text-h5" name="close" />
      </div>
      <div class="flex column justify-center q-mx-auto items-center">
        <div class="q-mt-md" style="width: 50px; height: 50px;">
          <img src="../assets/envelop.svg" alt="">
        </div>
        <div class="q-mb-lg q-mt-lg">
          Hi Jerome, we’ve noticed you <br/> haven’t signed up for <br/> notifcations. Signup to <br/> get notified of claims.
        </div>
        <div class="flex justify-between items-basline q-pb-md">
          <div class="add-input flex justify-between" style="width: 200px; margin-right: 20px; height: 35px;">
            <input placeholder="Email"/>
          </div>
          <span class="curve-arrow">
              <img src="../assets/curve-arrow.svg" alt="">
          </span>
        </div>
      </div>
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
    background: #00a1ed;
    padding: 10px;
    position: relative;
    /* z-index: -1; */
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

.box {
  position: absolute;
  right: 20px;
  top: 60px;
  z-index: 1000;
  box-shadow:
  0 2.8px 2.2px rgba(0, 0, 0, 0.034),
  0 6.7px 5.3px rgba(0, 0, 0, 0.048),
  0 12.5px 10px rgba(0, 0, 0, 0.06),
  0 22.3px 17.9px rgba(0, 0, 0, 0.072),
  0 41.8px 33.4px rgba(0, 0, 0, 0.086),
  0 100px 80px rgba(0, 0, 0, 0.12);
  width: 300px;
  border-radius: 8px;
}

.add-input {
  border-left: 2px solid #00a1ed;
  border-bottom: 2px solid #00a1ed;
  margin-bottom: 20px;
  input {
    border: none;
    outline: none;
    padding-left: 10px;
    font-size: 13px;
  }
}

.curve-arrow {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #00a1ed;
  border-radius: 50%;
  cursor: pointer;
  img {
    width: 20px;
    height: 20px;
  }
}
</style>
