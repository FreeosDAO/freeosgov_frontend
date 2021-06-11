<template>
<div class="text-center relative">

    <q-dialog v-model="registerModalTrigger">
        <q-card style="max-width: 440px;" class="q-pa-lg">
            <div class="flex justify-center text-center q-mt-md" style="width: 80px; height: 80px; margin: 0 auto;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 84" class="freeos-logo-icon inline-block fill-current text-primary header-logoicon">
                    <path fill="#00a1ed" d="M41.7 0C18.7 0 0 18.7 0 41.7c0 23 18.7 41.7 41.7 41.7 23 0 41.7-18.7 41.7-41.7C83.4 18.7 64.8 0 41.7 0zM26.9 68.6c-2.7 0-5.3-1-7.3-2.8-13.3-12.2-14.2-32.9-2-46.3C23.8 12.8 32.6 9 41.7 9c1.7 0 3.4.1 5.1.4h.2c-5.6 2.3-9.7 7.5-10.6 13.5-.1.6-.2 1.3-.2 1.9V26c-.1 4.1.1 8.2.6 12.3l-10.6 3.9c-.7.3-1.1 1.1-.8 1.8l.5 1.2c1.4 4 5.8 6 9.8 4.6.4-.2.9-.4 1.3-.6l1-.6.3-.2v.4c.2 3 .1 6-.2 9H38c0 .3 0 .6-.1 1-.1.6-.2 1.2-.4 1.8-1.4 4.8-5.7 8-10.6 8zm14.8 5.9c-1.8 0-3.7-.2-5.5-.5 6-2.5 10.1-8 10.8-14.5.7-5.4.7-10.9-.1-16.3l10.8-6.4c1.2-.7 1.7-2.2 1.2-3.5l-.1-.3c-.5-1.4-2-2.1-3.4-1.6L45.9 35l-.2.1V35c-.4-2.8-.5-5.7-.4-8.5.4-8.3 5.3-11.7 11.3-11.6 2.5.1 4.8.9 6.8 2.4.5.4.9.8 1.4 1.3 12.8 12.6 12.9 33.3.2 46.2-6.2 6.2-14.5 9.7-23.3 9.7z"></path>
                </svg>
            </div>
            <q-card-section class="q-mt-xs text-center">
                <div class="text-h6">Register Your Interest</div>
            </q-card-section>

            <q-card-section class="q-pt-none text-center">
                <p class="text-body1">Before you start, we need to register your
                    interest in the FREEOS AirClaim.
                    It’s just a press of a button.</p>

                <p class="text-body2">By connecting you accept Freeos’s <a href>Terms of Service</a></p>

            </q-card-section>

            <q-card-actions align="center">
                <q-btn unelevated no-caps size="lg" class="q-mb-m" outline color="primary" @click="registerUser()">Register</q-btn>
            </q-card-actions>
        </q-card>
    </q-dialog>


    <ClaimCompleteDialog :isOpen="isShowClaimCompleteDialog" />
    <div class="add-bg">
        <div v-if="!isFreeosEnabled">
            <b>Freeos system is not currently operational. Please check back later.</b>
        </div>
        <div v-if="isFreeosEnabled">
            <div class="q-ma-md" style="margin-bottom: 60px;">
                <small class="text-subtitle1" style="line-height:.8;">COMBINED TOTAL</small>
                <p class="text-bold text-h1" style="line-height:.8;">{{totalFreeos}}</p>
            </div>
        </div>
        <div class="add-bg-white" v-if="isFreeosEnabled">
            <div class="flex justify-between add-custome-width">
                <div class="text-left">Note: {{notes}}</div>
                <div class="wrap-avatar" style="margin-left:-10px;">


                    <div class="avatar q-hidden" v-bind:class="{'disable-btn': !canClaim}">
                            <q-icon size="md" style="margin-top: -50px; margin-bottom: 15px;" v-bind:class="{'hide': canClaim}">
                                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                                    <g>
                                        <g>
                                            <path fill="#ffffff" d="M501.362,383.95L320.497,51.474c-29.059-48.921-99.896-48.986-128.994,0L10.647,383.95
                      c-29.706,49.989,6.259,113.291,64.482,113.291h361.736C495.039,497.241,531.068,433.99,501.362,383.95z M256,437.241
                      c-16.538,0-30-13.462-30-30c0-16.538,13.462-30,30-30c16.538,0,30,13.462,30,30C286,423.779,272.538,437.241,256,437.241z
                      M286,317.241c0,16.538-13.462,30-30,30c-16.538,0-30-13.462-30-30v-150c0-16.538,13.462-30,30-30c16.538,0,30,13.462,30,30
                      V317.241z" />
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
<svg style="position: absolute;width: 130px;height: 130px;top:50%;left:50%;transform:translate(-50%,-50%)" version="1.2" baseProfile="tiny" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
	 x="0px" y="0px" viewBox="0 0 100 100" overflow="visible" xml:space="preserve">
<path style="opacity:.1" fill="#FFFFFF" d="M50.5,15.6c-19.2,0-34.8,15.6-34.8,34.8s15.6,34.8,34.8,34.8s34.8-15.6,34.8-34.8S69.8,15.6,50.5,15.6z
	 M38.2,72.9c-2.4,0-4.5-0.9-6.1-2.3l0,0c-4.3-4-7.4-9.4-8.5-15.4c-0.3-1.5-0.4-3.1-0.4-4.7c0-15.1,12.2-27.3,27.3-27.3
	c1.5,0,2.9,0.1,4.3,0.3c0,0,0.1,0,0.1,0c-4.7,2.1-8,6-8.8,11.3l0,0c0,0,0,0,0,0C46,35.3,46,35.8,46,36.3l0,0c0,0,0,0.1,0,0.3
	c0,0.1,0,0.1,0,0.2c0,0.2,0,0.3,0,0.5l0,0c-0.1,2.3-0.1,5.9,0.5,10.3l-8.8,3.2c-0.6,0.2-0.9,0.9-0.7,1.5l0.4,1
	c1.4,3.8,5.8,5.3,9.3,3.3l0.8-0.5l0.2-0.1l0,0.3c0.2,3.3,0,5.9-0.2,7.5l-0.1,0c0,0.3,0,0.5-0.1,0.8c-0.1,0.9-0.3,1.4-0.3,1.5
	C45.9,70.1,42.4,72.9,38.2,72.9z M50.5,77.8c-1.6,0-3.1-0.1-4.6-0.4c0,0,0,0,0,0h0c4.9-2.2,8.4-6.4,9-12.1c0.3-2.1,0.8-7.4-0.1-13.6
	l9-5.4c1-0.6,1.4-1.8,1-2.9l-0.1-0.2c-0.4-1.2-1.7-1.7-2.9-1.3l-8,2.9l-0.1,0l0-0.1c-0.4-3.7-0.4-6.1-0.3-7.1l0,0
	c0.3-6.9,4.4-9.8,9.4-9.7c2.1,0,4.1,0.8,5.7,2c0.4,0.3,0.8,0.7,1.1,1.1c4.1,4,6.9,9.4,7.8,15.3c0.2,1.3,0.3,2.7,0.3,4.1
	C77.9,65.5,65.6,77.8,50.5,77.8z"/>
<g>
	<path fill="#FFFFFF" d="M14.9,51.4c0-4.7,3.5-7.8,8-7.8c3.5,0,5.4,1.8,6.5,3.7l-2.8,1.4c-0.6-1.2-2-2.2-3.7-2.2
		c-2.6,0-4.6,2.1-4.6,5s2,5,4.6,5c1.7,0,3-1,3.7-2.2l2.8,1.3c-1.1,1.9-3,3.7-6.5,3.7C18.5,59.2,14.9,56,14.9,51.4z"/>
	<path fill="#FFFFFF" d="M31.3,43.8h3.2v12.3h6.4v2.8h-9.6V43.8z"/>
	<path fill="#FFFFFF" d="M52.8,56.3h-6.8l-1,2.6h-3.5l5.9-15.2h4l5.8,15.2h-3.5L52.8,56.3z M46.9,53.5h5l-2.5-7L46.9,53.5z"/>
	<path fill="#FFFFFF" d="M58.7,43.8h3.2v15.2h-3.2V43.8z"/>
	<path fill="#FFFFFF" d="M78.1,48l-4.3,10.9h-1.4L68.2,48v10.9h-3.2V43.8h4.5l3.7,9.5l3.7-9.5h4.5v15.2h-3.3V48z"/>
</g>
<g>
	<path fill="#FFFFFF" d="M23.8,68.6l-2.6-3.9h1.3l1.8,2.9l1.8-2.9h1.3L25,68.6v2.8h-1.2V68.6z"/>
	<path fill="#FFFFFF" d="M26.7,68.9c0-1.4,0.9-2.5,2.5-2.5c1.5,0,2.5,1.1,2.5,2.5c0,1.4-0.9,2.5-2.5,2.5
		C27.7,71.4,26.7,70.3,26.7,68.9z M30.6,68.9c0-0.8-0.5-1.6-1.4-1.6c-0.9,0-1.4,0.7-1.4,1.6c0,0.9,0.5,1.6,1.4,1.6
		C30.1,70.5,30.6,69.8,30.6,68.9z"/>
	<path fill="#FFFFFF" d="M36,70.7c-0.4,0.4-0.9,0.8-1.7,0.8c-1,0-1.5-0.5-1.5-1.5v-3.4h1v3c0,0.7,0.4,1,1,1c0.5,0,1-0.3,1.2-0.6
		v-3.4h1v4.8h-1V70.7z"/>
	<path fill="#FFFFFF" d="M38.4,66.5h1v0.7c0.4-0.5,0.9-0.8,1.6-0.8v1c-0.1,0-0.2,0-0.3,0c-0.4,0-1,0.3-1.2,0.6v3.3h-1V66.5z"/>
	<path fill="#FFFFFF" d="M44.5,64.7h4.6v1h-3.4v1.7H49v1h-3.3v2.9h-1.2V64.7z"/>
	<path fill="#FFFFFF" d="M52.5,68.8h-1.2v2.5h-1.2v-6.7h2.9c1.3,0,2.2,0.9,2.2,2.1c0,1.2-0.8,1.8-1.6,2l1.6,2.6h-1.3L52.5,68.8z
		 M52.9,65.7h-1.6v2.1h1.6c0.7,0,1.1-0.4,1.1-1.1S53.6,65.7,52.9,65.7z"/>
	<path fill="#FFFFFF" d="M56.4,64.7H61v1h-3.4v1.7h3.3v1h-3.3v1.8H61v1h-4.6V64.7z"/>
	<path fill="#FFFFFF" d="M62.2,64.7h4.6v1h-3.4v1.7h3.3v1h-3.3v1.8h3.4v1h-4.6V64.7z"/>
	<path fill="#FFFFFF" d="M71.1,64.5c2,0,3.4,1.5,3.4,3.4s-1.4,3.4-3.4,3.4S67.6,70,67.6,68S69.1,64.5,71.1,64.5z M71.1,65.6
		c-1.3,0-2.2,1-2.2,2.4c0,1.4,0.9,2.4,2.2,2.4c1.3,0,2.2-1,2.2-2.4C73.3,66.6,72.4,65.6,71.1,65.6z"/>
	<path fill="#FFFFFF" d="M75.8,69.5c0.5,0.5,1.2,0.9,2.1,0.9c1,0,1.3-0.5,1.3-0.9c0-0.6-0.7-0.8-1.5-1c-1.1-0.3-2.4-0.6-2.4-2
		c0-1.1,1-1.9,2.4-1.9c1,0,1.9,0.3,2.5,0.9l-0.7,0.9c-0.5-0.5-1.2-0.8-1.9-0.8c-0.7,0-1.1,0.3-1.1,0.8c0,0.5,0.7,0.7,1.5,0.9
		c1.1,0.3,2.4,0.6,2.4,2.1c0,1.1-0.8,2.1-2.6,2.1c-1.2,0-2.1-0.4-2.7-1.1L75.8,69.5z"/>
	<path fill="#FFFFFF" d="M33.4,76.5c2,0,3.4,1.5,3.4,3.4s-1.4,3.4-3.4,3.4S30,82,30,80S31.4,76.5,33.4,76.5z M33.4,77.6
		c-1.3,0-2.2,1-2.2,2.4c0,1.4,0.9,2.4,2.2,2.4c1.3,0,2.2-1,2.2-2.4C35.6,78.6,34.7,77.6,33.4,77.6z"/>
	<path fill="#FFFFFF" d="M37.9,76.7h2.9c1.4,0,2.2,1,2.2,2.1c0,1.1-0.8,2.1-2.2,2.1h-1.8v2.5h-1.2V76.7z M40.7,77.7h-1.6v2.1h1.6
		c0.7,0,1.1-0.4,1.1-1.1S41.4,77.7,40.7,77.7z"/>
	<path fill="#FFFFFF" d="M45.6,77.7h-2v-1h5.2v1h-2v5.6h-1.2V77.7z"/>
	<path fill="#FFFFFF" d="M49.8,76.7H51v6.7h-1.2V76.7z"/>
	<path fill="#FFFFFF" d="M55.5,76.5c2,0,3.4,1.5,3.4,3.4s-1.4,3.4-3.4,3.4S52.1,82,52.1,80S53.5,76.5,55.5,76.5z M55.5,77.6
		c-1.3,0-2.2,1-2.2,2.4c0,1.4,0.9,2.4,2.2,2.4c1.3,0,2.2-1,2.2-2.4C57.7,78.6,56.8,77.6,55.5,77.6z"/>
	<path fill="#FFFFFF" d="M61.2,78.5v4.9H60v-6.7h1.2l3.4,4.7v-4.7h1.2v6.7h-1.1L61.2,78.5z"/>
	<path fill="#FFFFFF" d="M67.5,81.5c0.5,0.5,1.2,0.9,2.1,0.9c1,0,1.3-0.5,1.3-0.9c0-0.6-0.7-0.8-1.5-1c-1.1-0.3-2.4-0.6-2.4-2
		c0-1.1,1-1.9,2.4-1.9c1,0,1.9,0.3,2.5,0.9l-0.7,0.9c-0.5-0.5-1.2-0.8-1.9-0.8c-0.7,0-1.1,0.3-1.1,0.8c0,0.5,0.7,0.7,1.5,0.9
		c1.1,0.3,2.4,0.6,2.4,2.1c0,1.1-0.8,2.1-2.6,2.1c-1.2,0-2.1-0.4-2.7-1.1L67.5,81.5z"/>
</g>
</svg>

    
                    </div>
                   
                </div>
                
                <div class="text-caption flex column text-right">
                    <span>Next Claim:</span>
                    <button style="color: #00a1ed; margin-top: -5px; background: none; border: none; outline: none; cursor: pointer; padding-right: 0; text-align: right;" class="text-caption text-capitalize">
                        Claim Now
                    </button>
                    <button style="color: #00a1ed; margin-top: -5px; background: none; border: none; outline: none; cursor: pointer; padding-right: 0; text-align: right;" class="text-caption text-capitalize" @click="startClaim()">{{nextClaimDescription}}</button>
                </div>
            </div>

            <div class="q-mt-md" v-if="canClaim">
                Claim now to claim your weekly<br />
                FREEOS.
            </div>
            <div class="q-mt-md" v-if="!canClaim" v-html="reasonCannotClaimHtml">
            </div>

        </div>
    </div>

    <div v-if="isFreeosEnabled">
        <!-- <balance class="col-xs-12 col-md-5 row text-left" /> -->
        <balance />
    </div>
    <div style="width: 300px; margin: 0 auto;" v-if="false">
        <q-btn class="add-hover q-mt-sm q-mb-md" style="width: 300px; height: 40px; border: 2px solid #00a1ed; border-radius: 8px; color: #00a1ed; width: 100%;">Invite friends and family</q-btn>
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
                        <path id="Path_34" data-name="Path 34" d="M846.384,319.645H767.538a1,1,0,0,1-1-1v-49a1,1,0,0,1,1-1h78.846a1,1,0,0,1,1,1v49A1,1,0,0,1,846.384,319.645Zm-77.846-2h76.846v-47H768.538Z" fill="#00aced" />
                        <path id="Path_35" data-name="Path 35" d="M806.961,295.143a1,1,0,0,1-.527-.151l-39.424-24.5a1,1,0,0,1,1.056-1.7l38.9,24.173,38.9-24.173a1,1,0,0,1,1.056,1.7l-39.423,24.5A1,1,0,0,1,806.961,295.143Z" fill="#00aced" />
                    </g>
                </svg>
            </div>
            <div class="q-mb-lg q-mt-lg">
                Hi Jerome, we’ve noticed you <br /> haven’t signed up for <br /> notifcations. Signup to <br /> get notified of claims.
            </div>
            <div class="flex justify-between items-basline q-pb-md">
                <div class="add-input flex justify-between" style="width: 200px; margin-right: 20px; height: 35px;">
                    <input placeholder="Email" />
                </div>
                <span class="curve-arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="59.438" height="59.439" viewBox="0 0 59.438 59.439">
                        <g id="Group_31" data-name="Group 31" transform="translate(-777.242 -556.374)">
                            <g id="Group_29" data-name="Group 29">
                                <circle id="Ellipse_3" data-name="Ellipse 3" cx="28.719" cy="28.719" r="28.719" transform="translate(778.242 557.374)" fill="#fff" />
                                <path id="Path_39" data-name="Path 39" d="M806.961,615.813a29.719,29.719,0,1,1,29.719-29.72A29.754,29.754,0,0,1,806.961,615.813Zm0-57.439a27.719,27.719,0,1,0,27.719,27.719A27.751,27.751,0,0,0,806.961,558.374Z" fill="#00aced" />
                            </g>
                            <g id="Group_30" data-name="Group 30">
                                <path id="Path_40" data-name="Path 40" d="M789.223,593.7l7.748-7.748h25.194" fill="#fff" />
                                <path id="Path_41" data-name="Path 41" d="M789.223,594.7a1,1,0,0,1-.707-1.707l7.748-7.748a1,1,0,0,1,.707-.293h25.2a1,1,0,0,1,0,2H797.385L789.93,594.4A.993.993,0,0,1,789.223,594.7Z" fill="#00aced" />
                            </g>
                            <path id="Path_42" data-name="Path 42" d="M815.936,595.507a1,1,0,0,1-.707-1.707l7.758-7.758-7.654-7.655a1,1,0,0,1,1.414-1.414l8.361,8.362a1,1,0,0,1,0,1.414l-8.465,8.465A1,1,0,0,1,815.936,595.507Z" fill="#00aced" />
                        </g>
                    </svg>
                </span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {
    mapState,
    mapActions,
    mapGetters
} from 'vuex'
import {
    FreeosBlockChainState
} from '../services/FreeosBlockChainState'
import Balance from 'components/accountManagement/Balance'
import ClaimCompleteDialog from 'src/components/stake/ClaimCompleteDialog.vue'

export default {
    name: 'Claim',
    data() {
        return {
            isShowClaimCompleteDialog: false
        }
    },
    components: {
        Balance,
        ClaimCompleteDialog
    },
    computed: {
        ...mapGetters('freeos', ['isRegistered', 'isFreeosEnabled', 'totalFreeos', 'canClaim', 'reasonCannotClaim', 'currentIteration']),
        ...mapState({
          stakedInfo: state => state.account.claimInfo.stakedInfo,
          liquidInAccount: state => state.account.claimInfo.liquidInAccount,
          accountName: state => state.account.accountName
        }),
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
        },
        registerModalTrigger: function () {
            return (this.isRegistered === false) ? true : false;
        }
    },
    methods: {
        ...mapActions('freeos', ['monitorBlockChain', 'claim']),
        ...mapActions('stake', ['onRegisterUser']),
        ...mapActions('account', ['getAccountInfo']),
        async registerUser () {
          await this.onRegisterUser(this.accountName)
          this.getAccountInfo()
        },
        async startClaim() {
            // await this.claim();
            this.isShowClaimCompleteDialog = true
        }

    },
    async mounted() {
        this.monitorBlockChain()
    }
}
</script>

<style lang="scss">
.hide{
  display: none !important;
}
.add-bg {
    position: relative;

    .add-blue-bg {
        position: absolute;
        top: -40px;
        left: 0;
        right: 0;
        width: 100%;

    }

    .add-blue-bg-clip {
        position: relative;
        width: 100%;
    }

    .add-blue-bg>svg {
        position: absolute;
        top: 0%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 5000px;
        clip: rect(0px, 5000px, 520px, 0px);

    }

    .add-bg-white {
        position: relative;
        z-index: 2000;
        margin: 30px auto;
        width: 350px;
        height: 150px;
        background: #fff;
        border-radius: 8px;
        padding: 10px 20px;
        .custome-width{
              flex-direction: row;
        }
        .wrap-avatar {
            border:5px solid #fff;
            position: relative;
            background-color: #cccccc;
            margin-top: -4rem;
            /* margin-left:  35px; */
            opacity: .9;
            width:8rem;
            height:8rem;
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
                    bottom: 0;
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
