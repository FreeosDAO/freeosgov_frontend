<template>
    <div class="intro-info text-center q-pa-sm">
        <div class="text-h4 text-weight-medium q-mb-none">Welcome to the</div>
        <div class="text-h3 text-weight-medium text-primary q-mb-md">Freeos Governance App</div>

        <div v-if="!connecting">
            <div v-if="airclaimStatus === 'Running'">
                <div class="text-weight-regular">
                    <div class="text-h5 q-mb-md q-mt-lg">
                        Access the Freeos Economic System here:
                    </div>
                </div>
                <div class="q-mt-md q-mb-lg">
                    <q-btn style="max-width:350px;" class="full-width" unelevated no-caps size="xl" outline
                        color="primary" @click="connectWallet('anchor')">Connect Wallet</q-btn>
                </div>
                <div class="text-h6 q-mt-md text-weight-medium q-mb-none">For more info visit <a target="_blank"
                        href="https://freeos.io/">freeos.io</a></div>
                <div class="q-mt-lg" style="">
                    <img src="../assets/join-screen-image.svg" alt="">
                </div>
                <q-toggle class="q-mt-lg q-px-md" v-model="ThreeJSToggle" label="Enable Animation" color="primary" />
            </div>
            <div v-if="airclaimStatus === 'Pending'">
                <div class="text-h3 text-weight-medium q-mb-md"><span @click="connectWallet('anchor')">S</span>tarts in</div>
                <Countdown :startDate="systemRow.init" />
                <div class="text-h6 q-mt-md text-weight-medium q-mb-none">For more info visit <a target="_blank"
                        href="https://freeos.io/">freeos.io</a></div>
            </div>
            <div v-if="airclaimStatus === 'Complete'">
                <div class="text-h3 text-weight-medium q-mt-sm q-mb-mb">Has now Closed</div>
                <!---<div class="text-h6 text-weight-medium q-mt-md q-mb-mb">You can still login to Check your Balance, Mint
                    &
                    Transfer for a limited time.</div>-->
                <div class="q-mt-md q-mb-sm" v-if="isFreeosEnabled === true">
                    <q-btn unelevated no-caps size="lg" outline color="primary" @click="connectWallet('anchor')">Connect
                        Wallet</q-btn>
                </div>
                <div class="text-h6 q-mt-md text-weight-medium q-mb-none">For more info visit <a target="_blank"
                        href="https://freeos.io/">freeos.io</a></div>
            </div>
            <div v-if="!airclaimStatus || !isFreeosEnabled" style="display:none;">
                <div class="q-pa-md  bg-negative" style="max-width:600px;margin:0 auto;">
                    <h4 class="text-white">The Governance is unavailable at this time, please try later </h4>
                </div>
            </div>
        </div>
        <Loading v-if="connecting && !isAuthenticated" />
    </div>

</template>

<script>
import {
    mapState,
    mapActions,
    mapGetters
} from 'vuex'
import Countdown from "components/Countdown.vue";
import Loading from 'src/components/Loading.vue'

export default {
    name: 'PageIndex',
    components: {
        Countdown,
        Loading
    },
    data() {
        return {
            ThreeJSToggle: true
        }
    },
    computed: {
        ...mapGetters('freeos', ['isFreeosEnabled', 'isAuthenticated', 'currentIteration', 'nextIteration', 'airclaimStatus', 'systemRow']),
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
        ThreeJSToggle(val, oldVal) {
            window.localStorage.setItem('freeos-anim', val)
        }
    },
    mounted() {
        document.body.classList.add('index')

        let anim = window.localStorage.getItem('freeos-anim')
        if (anim == 'false') {
            this.ThreeJSToggle = false
        } else {
            window.localStorage.setItem('freeos-anim', 'true')
        }
    }
}
</script>

<style>
body.index {
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
</style>
