<template>
    <div class="text-center relative q-px-md">

        <CompleteDialog ref="complete"></CompleteDialog>

        <div v-if="!isFreeosEnabled">
            <b>Freeos system is not currently operational. Please check back later.</b>
        </div>

        <GetVerified message="Get Verified to Claim" />

        <div v-if="isFreeosEnabled">
            <div class="bg-white panel-wrap panel-top-total q-pa-lg">
                <div class="row">
                    <div class="col text-left">
                        <p class="q-mb-xs" style="line-height:1;">
                           <small>{{currencies.point}}</small>
                        </p>
                        <AbbreviateNumber classes="text-bold text-h4" :value="user.pointBalance" />

                        <p class="q-mb-xs q-mt-lg" style="line-height:1;">
                            <small>{{currencies.freebi}}</small>
                        </p>
                        <AbbreviateNumber classes="text-bold text-h4" :value="user.freebiBalance" />

                    </div>
                    <div class="col" style="max-width:40px;">
                        <router-link class="convert-btn" to="/mint">
                            <small>Mint</small>
                            <svg
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                x="0px"
                                y="0px"
                                viewBox="0 0 24 24"
                                style="enable-background:new 0 0 24 24;"
                                xml:space="preserve"
                            >
                                <path
                                    d="M14,12.6H1.5c-0.4,0-0.7-0.3-0.7-0.7c0-0.4,0.3-0.7,0.7-0.7H14c0.4,0,0.7,0.3,0.7,0.7C14.7,12.3,14.4,12.6,14,12.6z"
                                />
                                <path
                                    d="M10.6,16c-0.2,0-0.3-0.1-0.5-0.2c-0.3-0.3-0.3-0.7,0-0.9l3-3l-3-3c-0.3-0.3-0.3-0.7,0-0.9c0.3-0.3,0.7-0.3,0.9,0l3.5,3.5
                                    c0.3,0.3,0.3,0.7,0,0.9L11,15.9C10.9,16,10.7,16,10.6,16z"
                                />
                                <path
                                    d="M13.2,21.5c-4,0-7.4-2.4-8.9-6.1c-0.1-0.3,0-0.7,0.4-0.8c0.3-0.1,0.7,0,0.8,0.4c1.3,3.2,4.3,5.2,7.7,5.2
                                    c4.5,0,8.3-3.7,8.3-8.3s-3.7-8.3-8.3-8.3c-3.4,0-6.4,2.1-7.7,5.2C5.4,9.2,5,9.4,4.7,9.3C4.3,9.1,4.2,8.8,4.3,8.4
                                    c1.4-3.7,4.9-6.1,8.9-6.1c5.3,0,9.6,4.3,9.6,9.6S18.5,21.5,13.2,21.5z"
                                />
                            </svg>
                        </router-link>
                    </div>
                    <div class="col text-right">
                        <p class="q-mb-xs" style="line-height:1;">
                            <small>{{currencies.freeos}}</small>
                        </p>
                        <AbbreviateNumber classes="text-bold text-h4" :value="user.freeosBalance" />
                    </div>
                </div>
            </div>

            <div class="claim-panel bg-white panel-wrap panel-top-total q-pa-lg">
                <div class="flex justify-between add-custome-width">
                    <div class="flex column text-left" style="flex:1">
                        <div class="q-mt-xs q-mb-xs">
                            <small>Iteration</small>
                            </div>
                        <div
                            style="background: none; border: none; outline: none;  padding-right: 0; text-align: left;line-height:1;"
                            class="q-mt-xs q-mb-xs text-h5 text-capitalize"
                        >
                            <strong>{{ currentIteration }}</strong>
                        </div>
                    </div>

                    <div class="wrap-avatar" v-bind:class="{ 'enable-btn': eligibleToClaim }" :disabled="claimWatch">
                        <div class="avatar claim-btn" @click="startClaim()">
                            <q-icon
                                size="md"
                                style="margin-top: -0px; margin-bottom: 2px;"
                                v-bind:class="{ 'hide': eligibleToClaim }"
                            >
                                <svg
                                    version="1.1"
                                    id="Layer_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    x="0px"
                                    y="0px"
                                    viewBox="0 0 512 512"
                                    style="enable-background:new 0 0 512 512;"
                                    xml:space="preserve"
                                >
                                    <path
                                        fill="#ffffff"
                                        d="M501.362,383.95L320.497,51.474c-29.059-48.921-99.896-48.986-128.994,0L10.647,383.95
                        c-29.706,49.989,6.259,113.291,64.482,113.291h361.736C495.039,497.241,531.068,433.99,501.362,383.95z M256,437.241
                        c-16.538,0-30-13.462-30-30c0-16.538,13.462-30,30-30c16.538,0,30,13.462,30,30C286,423.779,272.538,437.241,256,437.241z
                        M286,317.241c0,16.538-13.462,30-30,30c-16.538,0-30-13.462-30-30v-150c0-16.538,13.462-30,30-30c16.538,0,30,13.462,30,30
                        V317.241z"
                                    />
                                </svg>
                            </q-icon>
                            <div class="claim-text">
                                <h4 style="line-height: 1; margin: 0;">CLAIM</h4>
                                <p style="line-height: 1; margin: 0;">
                                    <small style="font-size:90%;">
                                        Your Freeos
                                        <br />
                                        {{currencies.point}}S
                                    </small>
                                </p>
                            </div>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 84 84"
                                class="claim-btn-logo"
                            >
                                <path
                                    d="M42.1.4C19.1.4.4 19.1.4 42.1s18.7 41.7 41.7 41.7 41.7-18.7 41.7-41.7S65.2.4 42.1.4zM27.3 69c-2.7 0-5.3-1-7.3-2.8C6.7 54 5.8 33.3 18 19.9c6.2-6.7 15-10.5 24.1-10.5 1.7 0 3.4.1 5.1.4h.2c-5.6 2.3-9.7 7.5-10.6 13.5-.1.6-.2 1.3-.2 1.9v1.2c-.1 4.1.1 8.2.6 12.3l-10.6 3.9c-.7.3-1.1 1.1-.8 1.8l.5 1.2c1.4 4 5.8 6 9.8 4.6.4-.2.9-.4 1.3-.6l1-.6.3-.2v.4c.2 3 .1 6-.2 9h-.1c0 .3 0 .6-.1 1-.1.6-.2 1.2-.4 1.8-1.4 4.8-5.7 8-10.6 8zm14.8 5.9c-1.8 0-3.7-.2-5.5-.5 6-2.5 10.1-8 10.8-14.5.7-5.4.7-10.9-.1-16.3l10.8-6.4c1.2-.7 1.7-2.2 1.2-3.5l-.1-.3c-.5-1.4-2-2.1-3.4-1.6l-9.5 3.6-.2.1v-.1c-.4-2.8-.5-5.7-.4-8.5.4-8.3 5.3-11.7 11.3-11.6 2.5.1 4.8.9 6.8 2.4.5.4.9.8 1.4 1.3 12.8 12.6 12.9 33.3.2 46.2-6.2 6.2-14.5 9.7-23.3 9.7z"
                                    fill="#ffffff"
                                />
                            </svg>
                        </div>
                    </div>

                    <div class="flex column text-right" style="flex:1">
                        <div class="q-mt-xs q-mb-xs">
                            <small>Next Claim</small>
                        </div>

                        <div
                            style="background: none; border: none; outline: none;  padding-right: 0; text-align: right;line-height:1;"
                            class="text-h5 q-mt-xs q-mb-xs"
                        >
                            <span v-html="$options.filters.secondsToDhms(nextClaimIn)"></span>
                        </div>
                    </div>
                </div>

                <div v-if="isVerified"
                    class="flex justify-center text-center q-mt-lg"
                    style="align-items:center;"
                >
                    <div class="full-width q-mb-sm" v-if="!eligibleToClaim">Please participate in the voting process to claim.</div>
                    <div v-if="nextActivity.type">
                        <div class="text-h6 text-primary">
                            <b v-html="nextActivity.message"></b>
                        </div>
                        <q-btn class="q-mt-sm q-mb-lg full-width" unelevated no-caps size="lg" color="primary" @click.prevent="goToActivities()"><span>Go to this week's <span v-html="nextActivity.type"></span></span></q-btn>
                    </div>
                    
                    <div class="flex">
                        <small class="q-mr-auto">
                            For more info on Claiming
                            <a title="Info on claiming" target="_blank" href="https://docs.freeos.io/d/h/6k0z3-408/43bbcca7c54387a/6k0z3-1422">click here</a>
                        </small>
                    </div>
                </div>
            </div>

            <!--REWARDS-->
            <div v-if="rewardsPrevious" class="bg-white panel-wrap panel-top-total q-pa-lg q-mt-lg">
                <div class="text-center text-h5 text-primary">
                    Iteration {{rewardsPrevious.iteration}} Result
                </div>
                <div v-if="rewardsPrevious.ratified" class="text-center">
                    <div class="text-subtitle1 text-bold q-mb-md">The vote was not ratified.</div> 
                    <p>This means there are no points to claim for the last iteration.<br><a title="Claim Info" target="_blank" href="https://docs.freeos.io/6915043/d/h/6k0z3-408/43bbcca7c54387a/6k0z3-1422">Click here for more info.</a></p>
                </div>
                <div v-if="!rewardsPrevious.ratified" class="text-center">
                    <div class="text-subtitle1 text-bold q-mb-md">The vote was ratified.</div>
                    <div class="balance-list">
                        <div class="q-mb-sm q-mr-xs q-ml-xs bg-info text-center">
                            <div class="text-bold text-subtitle1 font-bold" style="line-height:1;">{{rewardsPrevious.participants}}</div>
                            <div class="text-bold text-primary">Participants</div>
                        </div>
                        <div class="q-mb-sm q-mr-xs q-ml-xs bg-info text-center">
                            <div class="text-bold text-subtitle1 font-bold" style="line-height:1;"><AbbreviateNumber :value="rewardsPrevious.iteration_issuance.split(' ')[0]" /></div>
                            <div class="text-bold text-primary">Total {{currencies.point}}s Issued</div>
                        </div>
                        <div class="q-mb-sm q-mr-xs q-ml-xs bg-info text-center">
                            <div class="text-bold text-subtitle1 font-bold" style="line-height:1;"><AbbreviateNumber :value="rewardsPrevious.participant_issuance.split(' ')[0]" /></div>
                            <div class="text-bold text-primary">User {{currencies.point}}s Issuance</div>
                        </div>
                        <div class="q-mb-sm q-mr-xs q-ml-xs bg-info text-center">
                            <div class="text-bold text-subtitle1 font-bold" style="line-height:1;"><AbbreviateNumber :value="rewardsPrevious.participant_issuance.split(' ')[0] * shares.surveyshare | roundTo4Decimal" /></div>
                            <div class="text-bold text-primary">{{currencies.point}}s for Survey</div>
                        </div>
                        <div class="q-mb-sm q-mr-xs q-ml-xs bg-info text-center">
                            <div class="text-bold text-subtitle1 font-bold" style="line-height:1;"><AbbreviateNumber :value="rewardsPrevious.participant_issuance.split(' ')[0] * shares.voteshare | roundTo4Decimal" /></div>
                            <div class="text-bold text-primary">{{currencies.point}}s for Vote</div>
                        </div>
                        <div class="q-mb-sm q-mr-xs q-ml-xs bg-info text-center">
                            <div class="text-bold text-subtitle1 font-bold" style="line-height:1;"><AbbreviateNumber :value="rewardsPrevious.participant_issuance.split(' ')[0] * shares.ratifyshare | roundTo4Decimal" /></div>
                            <div class="text-bold text-primary">{{currencies.point}}s for Ratify</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <balance />
       
    </div>
</template>

<script>
import {
    mapActions,
    mapGetters
} from 'vuex'
import Balance from 'components/Balance'
import CompleteDialog from 'src/components/CompleteDialog.vue'
import GetVerified from 'src/components/GetVerified.vue'
import AbbreviateNumber from 'src/components/AbbreviateNumber.vue'
import { dparametersTable } from 'src/store/freeos/getters'

export default {
    name: 'Claim',
    data() {
        return {
            claimWatch: null
        }
    },
    components: {
    Balance,
    CompleteDialog,
    GetVerified,
    AbbreviateNumber
},
    computed: {
        ...mapGetters('freeos', [
            'isFreeosEnabled',
            'isVerified',
            'user',
            'accountType', 
            'nextClaimIn',
            'currentIteration',
            'eligibleToClaim',
            'nextActivity',
            'accountName',
            'currencies',
            'rewardsPrevious',
            'dparametersTable'
            ]),
        
        shares(){
            let shares = {'surveyshare': 0, 'voteshare': 0, 'ratifyshare': 0}
            
            for (const key in shares) {
                let request = this.dparametersTable.filter(function(row){
                    return row.paramname == key
                })
                shares[key] = (request.length) ? request[0].value : 0
            }

            console.log('shares', shares)
            
            return shares;
        }
    },
    methods: {
        ...mapActions('freeos', ['fetch', 'claim']),
        async goToActivities(){
            this.$router.push({
                path: '/activities'
            })
        },
        async startClaim() {
            if (this.eligibleToClaim) {
                const _ = this;
                this.claimWatch = true

                var currentPointBalance = this.user.pointBalance

                var result = await _.claim()
                if (!(result instanceof Error)) {

                    //var updateVars = await _.fetch()
                    //if (!(updateVars instanceof Error)) {
                        var newPointsBalance = this.user.pointBalance

                        let pointsUnlocked = newPointsBalance - currentPointBalance
                        console.warn('currentPointBalance', currentPointBalance)
                        console.warn('newPointsBalance', newPointsBalance)

                        this.$refs.complete.openDialog({
                            title: "Woohoo", subtitle: "Your claim is being processed.", value: null, currency: null
                        });
                    //}
                    
                }
                this.claimWatch = false
            }
        }

    }
}
</script>

<style lang="scss">

.convert-btn {
    text-decoration: none;
    opacity: 0.5;
    color: #000;
    line-height: 1;
    small {
        margin-bottom: 0;
        display: block;
    }
    &:hover {
        opacity: 1;
    }
}

.balance-list {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  justify-content: center;
}

.balance-list>* {
  flex: 0 0 46%;
  max-width: 46%;
  padding: 8px;
  border-radius: 8px;
}

.social-icon{
    margin:0 4px;
    border:1px solid var(--q-color-primary);
    border-radius: 50%;
    display: inline-block;
    height:38px;width:38px;
    display: inline-flex;
    flex-direction: columns;
    justify-content: center;
    align-items: center;
    transition:all .1s linear;
    svg{
        fill:var(--q-color-primary);
        height:22px;width:22px;
    }
    &:hover{
        background:var(--q-color-primary);
        svg{
            fill:white;
        }
    }
}

.claim-btn {
    .st0 {
        fill: #ffffff;
    }
}
.claim-text {
    color: #fff;
    position: relative;
    display: flex;
    opacity: 0.7;
    flex-direction: column;
}
.claim-btn-logo {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 110px;
    height: 110px;
    opacity: 0.15;
    transform: translate(-50%, -50%);
}

.claim-panel {
        .text-subtitle1 {
            font-size: 0.95rem;
            line-height: 1;
        }
        .custome-width {
            flex-direction: row;
        }

        .wrap-avatar {
            position: relative;
            background-color: #cccccc;
            box-shadow: none;
            border: 4px solid #fff;
            margin: -4.5rem -25px 0;
            /* margin-left:  35px; */
            opacity: 1;
            width: 8rem;
            height: 8rem;
            cursor: default;
            /* width: inherit; */
            /* height: inherit; */
            border-radius: 100%;

            .behind-bg {
                position: absolute;
                top: 20px;
                left: 13px;
                bottom: 0;
                right: 0;
                background-image: url("../assets/freeos.svg");
                width: 70px;
                height: 70px;
                z-index: -1;
            }

            &.enable-btn {
                border: 2px solid #fff;
                box-shadow: 0 0 14px rgba(0, 0, 0, 0.3),
                    0 0 5px rgba(0, 0, 0, 0.3);
                transition: all 0.1s linear;
                cursor: pointer;
                .claim-text {
                    margin-top: 14px;
                    opacity: 1;
                }
                .avatar:before {
                    opacity: 1;
                    background-color: var(--q-color-primary);
                }
                &:hover {
                    transform: scale(0.95);
                    box-shadow: 0 0 1px rgba(0, 0, 0, 1),
                        0 0 1px rgba(0, 0, 0, 1);
                }
            }

            .avatar {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                color: #fff;
                position: relative;
                flex-direction: column;
                &::before {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    background-color: #cccccc;

                    border-radius: 100%;
                }
            }
        }
    }

.add-hover:hover {
    color: #fff !important;
    border: none !important;
    background-color: #f7931e;
    transition: 0.3s all ease-in-out;
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
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
        0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
        0 22.3px 17.9px rgba(0, 0, 0, 0.072),
        0 41.8px 33.4px rgba(0, 0, 0, 0.086), 0 100px 80px rgba(0, 0, 0, 0.12);
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

.q-ripple {
    display: none;
}
</style>
