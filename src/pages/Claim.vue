<template>
  <div class="text-center relative">
    <claim-complete-dialog :isOpen="isShowClaimCompleteDialog"></claim-complete-dialog>
    <div class="add-bg">
    <div v-if="!isFreeosEnabled">
      <b>Freeos system is not currently operational. Please check back later.</b>
    </div>
  <div v-if="isFreeosEnabled">
      <div class="q-ma-md" style="margin-bottom: 60px;">
          <span class="text-bold text-h2">{{totalFreeos}}</span> <br/>
          <span class="text-h4">FREEOS</span>
      </div>
    </div>
      <div class="add-bg-white" v-if="isFreeosEnabled">
        <div class="flex justify-between">
          <span>Note: {{notes}}</span>
          <div class="wrap-avatar">
            <div class="avatar" v-bind:class="{'disabled': !canClaim}">
              <q-btn class="btn-claim" @click="startClaim()">
              <q-icon style="margin-top: -22px; margin-bottom: 11px;">
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                  viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                <g>
                  <g>
                    <path fill="#ffffff" d="M501.362,383.95L320.497,51.474c-29.059-48.921-99.896-48.986-128.994,0L10.647,383.95
                      c-29.706,49.989,6.259,113.291,64.482,113.291h361.736C495.039,497.241,531.068,433.99,501.362,383.95z M256,437.241
                      c-16.538,0-30-13.462-30-30c0-16.538,13.462-30,30-30c16.538,0,30,13.462,30,30C286,423.779,272.538,437.241,256,437.241z
                      M286,317.241c0,16.538-13.462,30-30,30c-16.538,0-30-13.462-30-30v-150c0-16.538,13.462-30,30-30c16.538,0,30,13.462,30,30
                      V317.241z"/>
                  </g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                <g>
                </g>
                </svg>
              </q-icon>
              <span class="text-h6">CLAIM</span>
            </q-btn>
            </div>
            <span class="behind-bg"></span>
          </div>
          <div class="text-caption flex column text-right">

            <span>Next Claim:</span>
            <button style="color: #00a1ed; margin-top: -5px; background: none; border: none; outline: none; cursor: pointer; padding-right: 0;" class="text-caption text-capitalize">
              Claim Now
            </button>
            <button style="color: #00a1ed; margin-top: -5px; background: none; border: none; outline: none; cursor: pointer; padding-right: 0;" class="text-caption text-capitalize"  @click="startClaim()">{{nextClaimDescription}}</button>
          </div>

        </div>

        <div class="q-mt-md" v-if="canClaim">
          Claim now to claim your weekly<br/>
          FREEOS.
        </div>
        <div class="q-mt-md" v-if="!canClaim" v-html="reasonCannotClaimHtml">
        </div>

      </div>
    </div>

    <div v-if="isFreeosEnabled">
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
          <!-- Envelop---Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" width="80.846" height="51.005" viewBox="0 0 80.846 51.005">
          <g id="Group_25" data-name="Group 25" transform="translate(-766.538 -268.64)">
            <path id="Path_34" data-name="Path 34" d="M846.384,319.645H767.538a1,1,0,0,1-1-1v-49a1,1,0,0,1,1-1h78.846a1,1,0,0,1,1,1v49A1,1,0,0,1,846.384,319.645Zm-77.846-2h76.846v-47H768.538Z" fill="#00aced"/>
            <path id="Path_35" data-name="Path 35" d="M806.961,295.143a1,1,0,0,1-.527-.151l-39.424-24.5a1,1,0,0,1,1.056-1.7l38.9,24.173,38.9-24.173a1,1,0,0,1,1.056,1.7l-39.423,24.5A1,1,0,0,1,806.961,295.143Z" fill="#00aced"/>
          </g>
        </svg>
        </div>
        <div class="q-mb-lg q-mt-lg">
          Hi Jerome, we’ve noticed you <br/> haven’t signed up for <br/> notifcations. Signup to <br/> get notified of claims.
        </div>
        <div class="flex justify-between items-basline q-pb-md">
          <div class="add-input flex justify-between" style="width: 200px; margin-right: 20px; height: 35px;">
            <input placeholder="Email"/>
          </div>
          <span class="curve-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="59.438" height="59.439" viewBox="0 0 59.438 59.439">
              <g id="Group_31" data-name="Group 31" transform="translate(-777.242 -556.374)">
                <g id="Group_29" data-name="Group 29">
                  <circle id="Ellipse_3" data-name="Ellipse 3" cx="28.719" cy="28.719" r="28.719" transform="translate(778.242 557.374)" fill="#fff"/>
                  <path id="Path_39" data-name="Path 39" d="M806.961,615.813a29.719,29.719,0,1,1,29.719-29.72A29.754,29.754,0,0,1,806.961,615.813Zm0-57.439a27.719,27.719,0,1,0,27.719,27.719A27.751,27.751,0,0,0,806.961,558.374Z" fill="#00aced"/>
                </g>
                <g id="Group_30" data-name="Group 30">
                  <path id="Path_40" data-name="Path 40" d="M789.223,593.7l7.748-7.748h25.194" fill="#fff"/>
                  <path id="Path_41" data-name="Path 41" d="M789.223,594.7a1,1,0,0,1-.707-1.707l7.748-7.748a1,1,0,0,1,.707-.293h25.2a1,1,0,0,1,0,2H797.385L789.93,594.4A.993.993,0,0,1,789.223,594.7Z" fill="#00aced"/>
                </g>
                <path id="Path_42" data-name="Path 42" d="M815.936,595.507a1,1,0,0,1-.707-1.707l7.758-7.758-7.654-7.655a1,1,0,0,1,1.414-1.414l8.361,8.362a1,1,0,0,1,0,1.414l-8.465,8.465A1,1,0,0,1,815.936,595.507Z" fill="#00aced"/>
              </g>
            </svg>
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
import ClaimCompleteDialog from 'components/stake/ClaimCompleteDialog'

export default {
  name: 'Claim',
  data () {
    return {
      isShowClaimCompleteDialog: false
    }
  },
  components: {
    Balance,
    ClaimCompleteDialog
  },
  computed: {
    ...mapGetters('freeos', ['isFreeosEnabled', 'totalFreeos', 'canClaim', 'reasonCannotClaim', 'currentIteration']),
    nextClaimDescription: function () {
      var daysToNextClaim = 1
      if (daysToNextClaim == 1) {
        return 'tomorrow'
      } else if (daysToNextClaim > 1) {
        return daysToNextClaim + ' day time'
      } else {
        return 'NOW!'
      }
    },
    notes: function () {
      return this.currentIteration ? ('Week ' + this.currentIteration.iteration_number) : ''
    },
    reasonCannotClaimHtml: function () {
      return this.$sanitize(this.reasonCannotClaim)
    }
  },
  methods: {
    ...mapActions('freeos', ['monitorBlockChain', 'claim']),
    async startClaim () {
      // await this.claim();
      this.isShowClaimCompleteDialog = true
    }
  },
  async mounted () {
    this.monitorBlockChain()
  }
}
</script>

<style lang="scss">
.add-bg {
  position: relative;
  .add-blue-bg {
    position: absolute;
    top: -40px;
    left:0;
    right: 0;
    width: 100%;

  }
  .add-blue-bg-clip {
    position: relative;
    width: 100%;
  }
.add-blue-bg > svg {
  position: absolute;
  top: 0%;
  left: 50%;
  transform: translate(-50%,-50%);
  width: 5000px;
  clip: rect(0px, 5000px, 520px, 0px);

}

  .add-bg-white {
    position: relative;
    z-index: 2000;
    margin: 30px auto;
    width: 300px;
    height: 150px;
    background: #fff;
    border-radius: 8px;
    padding: 10px 20px;
    /* border: 2px solid #e5e5e5; */

    .wrap-avatar {
      position: relative;
      background-color: #cccccc;
      margin-top: -45px;
      margin-left:  35px;
      opacity: .9;
      width: 100px;
      height: 100px;
      border-radius: 100%;
      .behind-bg {
        position: absolute;
        top: 20px;
        left: 15px;
        bottom: 0;
        right: 0;
        background-image: url("../assets/freeos.svg");
        width: 70px;
        height: 70px;
        z-index: -1;
      }
      .avatar {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        color: #fff;
        position: relative;
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          bottom:0;
          right: 0;
          background-color: #cccccc;
          opacity: .8;
          border-radius: 100%;
        }

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
  z-index: 1000;
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

/* remove padding-right */
/* .q-btn__wrapper {
  padding-right: 0;
} */

.q-ripple {
  display: none;
}
</style>
