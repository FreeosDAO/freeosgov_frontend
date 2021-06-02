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
      <div class="add-blue-bg-clip">
      <div class="add-blue-bg">
        <svg fill="#00a1ed" viewBox="0 0 140 27" overflow="hidden" >
        <path d="M 0 0 L 0 30 L 70 30 L 70 10 M 140 0 L 140 30 L 70 30 L 70 10" />
        Sorry, your browser does not support inline SVG.
      </svg>
      </div>
      </div>
      <div class="add-bg-white">
        <div class="flex justify-between">
          <span class="text-caption">Note: </span>
          <div class="avatar">
            <q-btn>CLAIM</q-btn>
          </div>
          <span class="text-caption flex column">
            <span>Next Claim:</span>
            <q-btn style="color: #00a1ed; margin-top: -5px;" class="text-caption text-capitalize">Claim Now</q-btn>
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
    <div v-if="isFreeosEnabled" style="">
        <!-- <balance class="col-xs-12 col-md-5 row text-left" /> -->
        <balance  />
    </div>
    <div style="width: 300px; margin: 0 auto;" v-if="false">
      <q-btn
        class="add-hover q-mt-sm q-mb-md"
        style="width: 300px; height: 40px; border: 2px solid #00a1ed; border-radius: 8px; color: #00a1ed; width: 100%;"
        >Invite friends and family</q-btn>
    </div>

    <div class="box" v-if="false">
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

<style lang="scss">
body {
    overflow-x: hidden;
}
  .add-bg {
    
    /* background: #00a1ed; */
    /* background-repeat: no-repeat; */
    /* background-position: right bottom; */
    /* background-image: url("../assets/bg.svg");
     */
     /* background-image: url('../assets/bg.svg'); */
     /* width: 500px; */
     /* height: 500px; */
    padding: 10px;
    top: 80px;
    position: relative;
    .add-blue-bg {
      position: absolute;
      top: 0;
      left:0;
      right: 0;
      width: 100%;
      /*;*/
      /* top: 0; */
      /* z-index: 0; */
    }

    .add-blue-bg-clip {
      position: relative;
width: 100%;

      /*
      
    ;*/
      
      
        
    }

    .add-blue-bg > svg {


  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%,-50%);
  
  width: 5000px;
  /* rect(<top>, <right>, <bottom>, <left>) */
    clip: rect(0px, 5000px, 520px, 0px);
    }

      

    /* &:before {
          position: absolute;
    height: 62%;
    top: -77px;
    bottom: 0;
    left: 0;
    right: 50%;
    content: "";
    display: inline-block;
    z-index: -1;
    transform: skewY(
4deg
);
    transform-origin: 100%;
    background: #fff;
    z-index: 100;
    } */
     /* &:after {
      position: absolute;
      height: 62%;
      bottom: 0;
      top: -77px;
      left: 50%;
      right: 0;
      content: "";
      display: inline-block;
      z-index: -1;
      transform: skewY(
      -4deg
      );
      transform-origin: 0;
      background: #fff;
      z-index: 100;
  } */
    /* z-index: -1; */
    .add-bg-white {
      top: -120px;
      position: relative;
      z-index: 2000;
      margin: 0px auto;
      width: 300px;
      height: 150px;
      background: #fff;
      border-radius: 8px;
      padding: 10px 20px;
        border: 2px solid #e5e5e5;

      .avatar {
        position: absolute;
        top: -30px;
        left: 35%;
        width: 80px;
        height: 80px;
        border-radius: 100%;
        background-color: #00a1ed;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        color: #fff;
        &:hover {
          background: #f7931e;
          color: #fff;
        }
        button {
          font-size: 20px;
          font-weight: bold;
        }

      }
    }
  }

.add-hover:hover {
  color: #fff !important;
  border: none !important;
  background-color: #f7931e;
  transition: .3s all ease-in-out;
}
.wrapper-box {
  position: relative;
}
.box {
  position: absolute;
  right: 20px;
  top: 60px;
  z-index: 2000;
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

// remove the bg on hover
.q-focus-helper {
  display: none;
}
</style>
