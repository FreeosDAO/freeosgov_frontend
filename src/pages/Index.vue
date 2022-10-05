<template>
    <div class="intro-info text-center q-pa-sm">
        <div class="text-h4 text-weight-medium q-mb-none">Welcome to the</div>
        <div class="text-h3 text-weight-medium text-primary q-mb-md">Freeos Governance App</div>

        <div v-if="!connecting">
            <div class="text-weight-regular">
                <div class="text-h5 q-mb-md q-mt-lg">
                    Access the Freeos Economic System here:
                </div>
            </div>
            <div class="q-mt-md q-mb-lg">
                <q-btn style="max-width:350px;" class="full-width" unelevated no-caps size="xl" outline color="primary"
                    @click="connectWallet('anchor')">Connect Wallet</q-btn>
            </div>
            <div class="text-h6 q-mt-md text-weight-medium q-mb-none">For more info visit <a target="_blank"
                    href="https://freeos.io/">freeos.io</a></div>
            <div class="q-mt-lg" style="">
                <img src="../assets/join-screen-image.svg" alt="">
            </div>
            <q-toggle class="q-mt-lg q-px-md" v-model="ThreeJSToggle" label="Enable Animation" color="primary" />
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
    data(){
        return{
            ThreeJSToggle: true
        }
    },
    computed: {
        ...mapGetters('freeos', ['isFreeosEnabled', 'isAuthenticated', 'currentIteration', 'nextIteration', 'airclaimStatus']),
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
        ThreeJSToggle(val, oldVal){
            window.localStorage.setItem('freeos-anim', val)
        }
    },
    mounted() {
        document.body.classList.add('index')

        let anim = window.localStorage.getItem('freeos-anim')
        if(anim == 'false'){
            this.ThreeJSToggle = false
        } else{
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
