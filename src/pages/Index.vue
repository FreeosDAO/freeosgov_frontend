<template>
<div class="intro-info text-center q-pa-lg">
    <div class="text-h4 text-weight-medium q-mb-none">Welcome to the</div>
    <div class="text-h3 text-weight-medium text-primary q-mb-md">Freeos Governance App</div>

    <div v-if="!connecting">
        <div class="text-weight-regular">
            <div class="text-h5 q-mb-md q-mt-lg">
                Access the Freeos Economic System here:
            </div>
        </div>
        <div class="q-mt-xs q-mb-sm">
            <q-btn unelevated no-caps size="lg" outline color="primary" @click="connectWallet('anchor')">Connect Wallet</q-btn>
        </div>
        <div class="text-h6 q-mt-md text-weight-medium q-mb-none">For more info visit <a target="_blank" href="https://freeos.io/">freeos.io</a></div>
        <div class="q-mt-lg" style="">
            <img src="../assets/join-screen-image.svg" alt="">
        </div>
    </div>

    <div v-if="connecting && !isAuthenticated">
        <div class="freeos-loading q-mt-lg"><div></div><div></div><div></div><div></div></div>
        <div class="text-h5">
                Loading your account...
        </div>
    </div>
   <!-- <div v-if="airclaimStatus === 'Running'">
        <div class="text-h4 text-weight-medium q-mb-none">Welcome to the</div>
        <div class="text-h3 text-weight-medium text-primary q-mb-md">Freeos Governance App</div>

        <div class="text-weight-regular">
            <div class="text-h5 q-mb-md q-mt-lg">
                Access the Freeos Economic System here:
            </div>
        </div>
        <div class="q-mt-xs q-mb-sm" v-if="isFreeosEnabled === true">
            <q-btn unelevated no-caps size="lg" outline color="primary" @click="connectWallet('anchor')">Connect Wallet</q-btn>
        </div>
        <div class="q-mt-xs q-mb-sm" v-if="isFreeosEnabled === false">
            <div class="q-pa-md  bg-negative" style="max-width:600px;margin:0 auto;">
                <h4 class="text-white">The AirClaim is unavailable at this time, please try later </h4>
            </div>
        </div>
    </div>
    <div v-if="airclaimStatus === 'Pending'">
        <div class="text-h4 text-weight-medium q-mb-none">Welcome, the</div>
        <div class="text-h3 text-weight-medium text-primary q-mb-none">Freeos Governance App</div>
        <div class="text-h3 text-weight-medium q-mb-md">Starts in</div>
        <Countdown :startDate="nextIteration.startStamp" />
    </div>
    <div v-if="airclaimStatus === 'Complete'">
        <div class="text-h3 text-weight-medium text-primary q-mb-none">the Freeos Governance App</div>
        <div class="text-h3 text-weight-medium q-mt-sm q-mb-mb">Has now Closed</div>
        <div class="text-h6 text-weight-medium q-mt-md q-mb-mb">You can still login to Check your Balance, Mint & Transfer for a limited time.</div>
        <div class="q-mt-md q-mb-sm" v-if="isFreeosEnabled === true">
            <q-btn unelevated no-caps size="lg" outline color="primary" @click="connectWallet('anchor')">Connect Wallet</q-btn>
        </div>
    </div>
    <div v-if="!airclaimStatus">
            <div class="q-pa-md  bg-negative" style="max-width:600px;margin:0 auto;">
                <h4 class="text-white">The AirClaim is unavailable at this time, please try later </h4>
            </div>
    </div>-->
</div>

</template>

<script>
import {
    mapState,
    mapActions,
    mapGetters
} from 'vuex'
import Countdown from "components/Countdown.vue";

export default {
    name: 'PageIndex',
    components: {
        Countdown
    },
    computed: {
        ...mapGetters('freeos', ['isFreeosEnabled', 'isAuthenticated', 'currentIteration', 'nextIteration','airclaimStatus']),
        ...mapGetters('account', ['connecting'])
    },
    methods: {
        ...mapActions('account', ['checkIfLoggedIn', 'connectWallet', 'logout', 'getAccountInfo', 'getClaimDetailInfo']),
        ...mapActions('freeos', ['fetch'])
    },
    watch: {
        isAuthenticated: {
            immediate: true,
            handler: function (val, oldVal) {
                if (val === true && this.isFreeosEnabled !== false) {
                    if (this.$route.query.returnUrl) {
                        this.$router.push({
                            path: this.$route.query.returnUrl
                        })
                    } else {
                        this.$router.push({
                            path: '/activities'
                        })
                    }
                }
            },
        },
    },
    mounted() {
        document.body.classList.add('index')
    }
}
</script>

<style>
body.index{
    background-color: #d5f2ff
}
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

.freeos-loading {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.freeos-loading div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid var(--q-color-primary);
  border-radius: 50%;
  animation: freeos-loading 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: var(--q-color-primary) transparent transparent transparent;
}
.freeos-loading div:nth-child(1) {
  animation-delay: -0.45s;
}
.freeos-loading div:nth-child(2) {
  animation-delay: -0.3s;
}
.freeos-loading div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes freeos-loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
