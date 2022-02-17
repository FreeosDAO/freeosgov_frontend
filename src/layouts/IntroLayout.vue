<template>
  <q-layout view="hHh Lpr fFf">



    <q-page-container class="page-container">
      <div class="flex justify-center text-center" style="width: 110px; height: 110px; margin: 80px auto 0px auto">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84 84" class="freeos-logo-icon-ani inline-block fill-current text-primary header-logoicon"><path fill="#00a1ed" d="M41.7 0C18.7 0 0 18.7 0 41.7c0 23 18.7 41.7 41.7 41.7 23 0 41.7-18.7 41.7-41.7C83.4 18.7 64.8 0 41.7 0zM26.9 68.6c-2.7 0-5.3-1-7.3-2.8-13.3-12.2-14.2-32.9-2-46.3C23.8 12.8 32.6 9 41.7 9c1.7 0 3.4.1 5.1.4h.2c-5.6 2.3-9.7 7.5-10.6 13.5-.1.6-.2 1.3-.2 1.9V26c-.1 4.1.1 8.2.6 12.3l-10.6 3.9c-.7.3-1.1 1.1-.8 1.8l.5 1.2c1.4 4 5.8 6 9.8 4.6.4-.2.9-.4 1.3-.6l1-.6.3-.2v.4c.2 3 .1 6-.2 9H38c0 .3 0 .6-.1 1-.1.6-.2 1.2-.4 1.8-1.4 4.8-5.7 8-10.6 8zm14.8 5.9c-1.8 0-3.7-.2-5.5-.5 6-2.5 10.1-8 10.8-14.5.7-5.4.7-10.9-.1-16.3l10.8-6.4c1.2-.7 1.7-2.2 1.2-3.5l-.1-.3c-.5-1.4-2-2.1-3.4-1.6L45.9 35l-.2.1V35c-.4-2.8-.5-5.7-.4-8.5.4-8.3 5.3-11.7 11.3-11.6 2.5.1 4.8.9 6.8 2.4.5.4.9.8 1.4 1.3 12.8 12.6 12.9 33.3.2 46.2-6.2 6.2-14.5 9.7-23.3 9.7z"></path></svg>
      </div>
      <div class="flex justify-center text-center" style="width: 120px; margin: 5px auto">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 340 120" class="freeos-logo-text-ani inline-block fill-current text-primary header-logotext"><path fill="#00a1ed" d="M262.4 34.4c-18.1 0-31.2 15.8-31.2 32.9 0 14.4 9.6 24.6 26.3 24.6 18.1 0 31.2-15.6 31.2-32.8 0-14.4-9.6-24.7-26.3-24.7zm-4.5 47c-9 0-14.3-5.7-14.3-14.6 0-11.1 7.6-21.8 18.5-21.8 9 0 14.3 5.7 14.3 14.6 0 11.2-7.6 21.8-18.5 21.8zM318.4 57.4c-5.7-2-10.5-3.9-10.5-7 0-3.6 3.5-6.5 9.6-6.5 6.8 0 13.6 3.6 16.2 7.3l6.3-7.8c-4.5-5.2-12.9-9-22.2-9-14.1 0-21.8 8.5-21.8 17.8 0 9.1 9.4 12.5 17.3 15.3 5.8 2 10.9 3.9 10.9 7.6 0 3.9-3.7 7.4-9.9 7.4-8 0-15.6-4.5-18.7-8.6l-7 8.3c5.7 6.3 14.7 9.7 24.7 9.7 14.4 0 22.8-8.6 22.8-18.7 0-9.4-9.7-12.9-17.7-15.8zM111.4 46.9l2.8-12.8h-.5c-7.9 0-13.7 2.4-19.1 8l1.6-6.8H83.5L71.2 90.9h12.7l8.2-37.3c2.8-3.4 8.1-7.4 14.1-7.4 2.1 0 4 .3 4.8.6l.4.1zM141.8 34c-17.8 0-31.7 14.7-31.7 33.4 0 15.3 10.7 24.9 28 24.9 7 0 14.3-2.3 19.5-6.1l.3-.2-4.1-9-.4.3c-3.5 2.7-9.2 4.5-14.4 4.5-10.6 0-16.3-6.6-16.3-12.7l.1-1.6h42.3l.1-.3c.5-1.9 1-5.6 1-8.5.1-14.8-9.7-24.7-24.4-24.7zm13 24.3h-30.6c1.5-6.7 7.8-13.7 16.6-13.7 8.5 0 14 4.9 14 12.5.1.3.1.8 0 1.2zM202.2 34c-17.8 0-31.7 14.7-31.7 33.4 0 15.3 10.7 24.9 28 24.9 7 0 14.3-2.3 19.5-6.1l.3-.2-4.1-9-.4.3c-3.5 2.7-9.2 4.5-14.4 4.5-10.6 0-16.3-6.6-16.3-12.7l.1-1.6h42.3l.1-.3c.5-1.9 1-5.6 1-8.5.1-14.8-9.7-24.7-24.4-24.7zm13.1 24.3h-30.6c1.5-6.7 7.8-13.7 16.6-13.7 8.5 0 14 4.9 14 12.5v1.2zM75.2 33.1H58.5l1.3-5.6c2.3-10.5 7-15.3 14.8-15.3 3-.1 6.1.7 8.6 2.4l.3.2 5.3-9.6-.3-.2c-4.5-2.7-9.7-4-15-3.8-14.1 0-23.3 8.8-27.3 26.2L44.9 33H31.3l-2.7 11.6h13.6l-7.4 32.5-2.9 10-1.7 6c-2.8 10.3-7.8 15-15.6 14.6-3 0-6-1-8.5-2.8l-.3-.3-5.8 9.3.3.2c4.4 2.9 9.5 4.5 14.8 4.6h1.7c13.2 0 22.3-8.3 27-24.8l1.7-6.1.2-1 10.2-42.2h16.7l2.6-11.5z"></path></svg>
     </div>
      <router-view />
    </q-page-container>
    <div style="position:fixed;top:0;right:0;max-width:550px;margin:0 auto;">
        <span class="q-ml-auto q-mr-sm">v{{appVersion}}</span> 
    </div>

  </q-layout>
</template>
<script>
// import WalletLoginDialog from 'components/accountManagement/WalletLoginDialog'
import { mapState, mapActions, mapGetters } from 'vuex'
// import dollar from '../assets/dollar-icon.svg'
const menuList = [
  {
    icon: require('@/assets/dollar-icon.svg'),
    label: 'Claim',
    separator: true,
    route: '/claim'
  },
  {
    icon: require('@/assets/transfericon.svg'),
    label: 'Transfer',
    separator: true,
    route: '/transfer'
  },
  {
    icon: require('@/assets/stack.svg'),
    label: 'Stake',
    separator: true,
    route: '/stake'
  },
  {
    icon: require('@/assets/register.svg'),
    label: 'Re-register',
    separator: true,
    route: '/register'
  },
  {
    icon: require('@/assets/proton.svg'),
    label: 'Alcor',
    separator: true,
    route: '/proton'
  },
  {
    icon: require('@/assets/info.svg'),
    label: 'Info',
    separator: true,
    route: '/info'
  }
]
export default {
  data () {
    return {
      isShowDrawerButton: false,
      drawer: false,
      selectedItemLabel: null,
      menuList
    }
  },
  computed: {
    ...mapState({
      accountName: state => state.account.accountName,
      iterationNumber: state => state.calendar.currentIteration.iteration_number
    }),
    ...mapGetters('account', ['isAuthenticated', 'connecting']),  
    appVersion: function () {
      return process.env.APP_VERSION
    }
  },
  components: {
    // Balance
  },
  created () {
    // this.getClaimCalendar()
    this.monitorBlockChain()
  },
  methods: {
    ...mapActions('freeos', ['monitorBlockChain']),
    onSigninFinish (event) {
      if (event.isFinished) {
        this.isShowDrawerButton = true
        this.drawer = true
        this.onSelectMenu(menuList[0])
      }
    },
    onSelectMenu (menuItem) {
      (this.$route.path !== menuItem.route) && this.$router.push(menuItem.route)
      this.selectedItemLabel = menuItem.label
    },
    ...mapActions('account', ['checkIfLoggedIn', 'connectWallet', 'logout', 'getAccountInfo', 'getClaimDetailInfo']),
    ...mapActions('calendar', ['getClaimCalendar'])
  },
  watch: {

  }
}
</script>
<style>
.freeos-logo-icon-ani{
    animation:fadeInRotate;
    opacity:0;
    animation-duration:1s;
    animation-iteration-count: 1;
    animation-delay:.75s;
    animation-fill-mode: forwards;
}
.freeos-logo-icon, .freeos-logo-text{
    width:100%;
    height:100%;
}
.freeos-logo-text-ani{
    animation:fadeIn;
    opacity:0;
    animation-duration:1s;
    animation-iteration-count: 1;
    animation-delay:1.5s;
    animation-fill-mode: forwards;
}
.intro-info{
    animation:fadeIn;
    opacity:0;
    animation-duration:1s;
    animation-iteration-count: 1;
    animation-delay:2s;
    animation-fill-mode: forwards;
}

@keyframes fadeInRotate {
    0% {
        opacity:0;
        transform: scale(3);
    }
    100% {
        opacity:1;
        transform: scale(1) rotate(360deg);
    }
}
@keyframes fadeIn {
    0% {
        opacity:0;
    }
    100% {
        opacity:1;
    }
}

.wallet-selector-anchor-logo {
    background-size: 40px !important;
    background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB3aWR0aD0iMTYwIiBoZWlnaHQ9IjE2MCIgdmlld0JveD0iMCAwIDI1NiAyNTYiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPGcgc3R5bGU9IiIgdHJhbnNmb3JtPSJtYXRyaXgoMC45LCAwLCAwLCAwLjksIDEyLjc5OTk5NSwgMTIuNzk5OTk1KSI+CiAgICA8Y2lyY2xlIGN4PSIxMjgiIGN5PSIxMjgiIHI9IjEyOCIgZmlsbD0iIzM2NTBBMiIgc3R5bGU9IiIvPgogICAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0gMTI4LjAxIDQ4IEMgMTMxLjY4OSA0OCAxMzUuMDQ0IDUwLjEwMiAxMzYuNjQ3IDUzLjQxMiBMIDE3NS4wNTcgMTMyLjYxMyBMIDE3NS45MjQgMTM0LjQgTCAxNTQuNTg3IDEzNC40IEwgMTQ4LjM3OCAxMjEuNiBMIDEwNy42NCAxMjEuNiBMIDEwMS40MzMgMTM0LjQgTCA4MC4wOTQgMTM0LjQgTCA4MC45NjMgMTMyLjYxMSBMIDExOS4zNzIgNTMuNDEyIEMgMTIwLjk3OCA1MC4xMDIgMTI0LjMzMSA0OCAxMjguMDEgNDggWiBNIDExNS40IDEwNS42MDEgTCAxNDAuNjE5IDEwNS42MDEgTCAxMjguMDEgNzkuNjAxIEwgMTE1LjQgMTA1LjYwMSBaIE0gMTU2Ljc5OCAxNjEuNiBMIDE3Ni4wMDggMTYxLjYgQyAxNzUuNDMgMTg3LjQ0MyAxNTQuMDM5IDIwOCAxMjguMDEgMjA4IEMgMTAxLjk4MyAyMDggODAuNTg5IDE4Ny40NDMgODAuMDEyIDE2MS42IEwgOTkuMjIgMTYxLjYgQyA5OS42NzEgMTczLjM2NyAxMDcuNDg5IDE4My40MDkgMTE4LjM5OSAxODcuMTk1IEwgMTE4LjM5OSAxNDguODAxIEMgMTE4LjM5OSAxNDMuNDk5IDEyMi42OTggMTM5LjIgMTI4IDEzOS4yIEMgMTMzLjMwMiAxMzkuMiAxMzcuNjAxIDE0My40OTkgMTM3LjYwMSAxNDguODAxIEwgMTM3LjYwMSAxODcuMjAxIEMgMTQ4LjUyMiAxODMuNDIxIDE1Ni4zNDkgMTczLjM3NiAxNTYuNzk4IDE2MS42IFoiIGZpbGw9IndoaXRlIiBzdHlsZT0iIi8+CiAgPC9nPgo8L3N2Zz4=") !important;
}

.wallet-selector-connect li div:first-child{
    width: 40px;
    height: 40px;
    background-size: 30px;
    background-repeat: no-repeat;
    background-position: 50%;
}
.wallet-selector-wallet-name:before{
    content: "Anchor";
    display: inline-block;
    font-family: 'Circular Std Book', sans-serif;
    font-size: 16px;
    line-height: 24px;
    color: white;
}
.wallet-selector-anchor-wallet .wallet-selector-wallet-name:before{
    content: "Anchor";
}
.wallet-selector-webauth-wallet .wallet-selector-wallet-name:before{
    content: "Browser WebAuth";
}
.wallet-selector-proton-wallet .wallet-selector-wallet-name:before{
    content: "Mobile WebAuth";
}

.wallet-selector-wallet-name{
    color:transparent !important;
}

.wallet-selector-proton-logo,.wallet-selector-webauth-logo {

    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='UTF-8'%3F%3E%3Csvg width='45px' height='50px' viewBox='0 0 45 50' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E%3Ctitle%3Elogo%3C/title%3E%3Cdefs%3E%3ClinearGradient x1='15.004%25' y1='50%25' x2='89.621%25' y2='53.538%25' id='linearGradient-1'%3E%3Cstop stop-color='%237543E3' offset='0%25'%3E%3C/stop%3E%3Cstop stop-color='%23582ACB' offset='100%25'%3E%3C/stop%3E%3C/linearGradient%3E%3C/defs%3E%3Cg id='Page-1' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E%3Cg id='logo' fill='url(%23linearGradient-1)' fill-rule='nonzero'%3E%3Cg id='Group'%3E%3Cpath d='M22.257,0 C25.457,0 28.219,3.328 30.037,8.735 C29.303,8.94 28.553,9.169 27.795,9.424 C26.285,4.95 24.211,2.318 22.257,2.318 C20.054,2.318 17.705,5.656 16.174,11.205 C16.772,11.399 17.376,11.604 17.991,11.831 C19.379,12.343 20.811,12.945 22.271,13.628 L22.521,13.51 C23.457,13.08 24.386,12.682 25.306,12.318 C25.418,12.275 25.527,12.232 25.636,12.188 C28.391,11.123 31.052,10.358 33.489,9.954 C38.737,9.079 42.427,9.984 43.875,12.5 C45.327,15.017 44.265,18.669 40.886,22.781 C40.691,23.017 40.493,23.255 40.284,23.491 C39.782,22.931 39.246,22.371 38.674,21.811 C41.657,18.348 42.831,15.321 41.872,13.659 C40.966,12.086 37.976,11.556 33.87,12.239 C32.992,12.385 32.08,12.583 31.143,12.827 C31.277,13.443 31.403,14.071 31.512,14.722 C31.765,16.179 31.962,17.72 32.101,19.325 C32.822,19.834 33.527,20.349 34.204,20.875 C36.856,22.93 39.134,25.086 40.886,27.219 C44.266,31.331 45.327,34.983 43.876,37.5 C42.788,39.39 40.433,40.37 37.104,40.37 C36.003,40.37 34.795,40.265 33.489,40.046 C33.152,39.99 32.809,39.927 32.461,39.858 C32.669,39.139 32.861,38.388 33.036,37.609 C33.317,37.666 33.596,37.715 33.87,37.762 C37.973,38.444 40.966,37.914 41.872,36.342 C42.973,34.43 41.253,30.714 37.209,26.604 C36.805,26.974 36.389,27.34 35.959,27.705 C35.897,27.758 35.83,27.815 35.768,27.865 C34.624,28.825 33.394,29.767 32.096,30.681 C32.033,31.409 31.962,32.127 31.876,32.825 C30.613,43.01 26.896,50 22.256,50 C19.063,50 16.305,46.682 14.486,41.288 C15.217,41.089 15.964,40.858 16.728,40.599 C18.239,45.059 20.306,47.682 22.257,47.682 C24.46,47.682 26.815,44.332 28.347,38.768 C27.747,38.577 27.141,38.373 26.529,38.146 C25.132,37.636 23.706,37.04 22.269,36.374 L22.177,36.417 C21.367,36.795 20.57,37.146 19.783,37.47 C19.661,37.52 19.543,37.57 19.423,37.613 C14.893,39.44 10.756,40.387 7.466,40.387 C4.189,40.387 1.759,39.447 0.635,37.5 C-0.972,34.712 0.549,30.63 4.355,26.325 L5.972,28.033 C2.893,31.563 1.67,34.656 2.642,36.341 C3.742,38.25 7.804,38.619 13.368,37.171 C13.237,36.558 13.112,35.931 13.002,35.281 C12.751,33.826 12.555,32.289 12.416,30.687 C11.691,30.179 10.986,29.667 10.316,29.152 C3.87,24.185 0,18.911 0,14.983 C0,14.076 0.208,13.242 0.635,12.5 C2.235,9.728 6.485,8.997 12.063,10.116 C11.851,10.844 11.656,11.606 11.481,12.394 C6.894,11.487 3.611,11.974 2.642,13.659 C1.542,15.567 3.255,19.275 7.287,23.379 C7.804,22.909 8.341,22.443 8.905,21.98 C9.991,21.08 11.167,20.187 12.418,19.31 C12.481,18.58 12.553,17.86 12.641,17.162 C13.904,6.987 17.621,0 22.257,0 Z M29.581,32.36 C29.024,32.714 28.461,33.063 27.885,33.404 C27.69,33.52 27.495,33.632 27.299,33.745 C26.615,34.139 25.93,34.52 25.253,34.877 C25.153,34.931 25.053,34.981 24.953,35.034 C25.656,35.332 26.354,35.611 27.045,35.868 C27.669,36.1 28.285,36.313 28.895,36.513 C29.03,35.878 29.156,35.223 29.27,34.546 C29.388,33.843 29.489,33.108 29.581,32.36 Z M14.925,32.357 C15.023,33.142 15.135,33.906 15.26,34.642 C15.37,35.287 15.492,35.906 15.622,36.511 C15.996,36.389 16.374,36.262 16.758,36.126 C16.874,36.086 16.993,36.043 17.108,36 C17.898,35.715 18.708,35.4 19.535,35.046 L19.558,35.036 C18.776,34.626 17.994,34.196 17.214,33.745 C17.174,33.722 17.132,33.699 17.092,33.672 C16.348,33.241 15.629,32.801 14.925,32.357 L14.925,32.357 Z M22.258,16.195 C21.467,16.581 20.673,16.985 19.879,17.417 C19.377,17.689 18.874,17.97 18.372,18.262 C17.055,19.022 15.814,19.805 14.644,20.596 C14.596,21.272 14.555,21.956 14.529,22.659 C14.499,23.424 14.486,24.205 14.486,25 C14.486,26.524 14.542,27.991 14.642,29.402 C15.317,29.859 16.012,30.312 16.738,30.758 C17.27,31.089 17.813,31.418 18.372,31.738 C19.665,32.486 20.966,33.175 22.259,33.804 L22.509,33.685 C23.368,33.262 24.237,32.805 25.12,32.315 C25.46,32.129 25.802,31.937 26.142,31.738 C27.459,30.978 28.7,30.196 29.87,29.405 C29.917,28.729 29.959,28.044 29.984,27.341 C30.014,26.576 30.027,25.795 30.027,25 C30.027,23.477 29.971,22.01 29.872,20.599 C29.198,20.143 28.505,19.689 27.779,19.242 C27.246,18.911 26.701,18.586 26.142,18.262 C24.825,17.5 23.528,16.815 22.258,16.195 L22.258,16.195 Z M22.257,22.02 C23.901,22.02 25.233,23.354 25.233,25 C25.233,26.646 23.901,27.98 22.257,27.98 C20.613,27.98 19.28,26.646 19.28,25 C19.28,23.354 20.612,22.02 22.256,22.02 L22.257,22.02 Z M32.29,22.33 C32.324,23.204 32.342,24.095 32.342,25 C32.342,25.219 32.342,25.437 32.339,25.656 C32.332,26.34 32.312,27.013 32.285,27.68 C32.881,27.229 33.453,26.776 33.999,26.325 C34.068,26.268 34.134,26.215 34.2,26.159 C34.663,25.771 35.105,25.385 35.531,24.999 C35.141,24.648 34.737,24.294 34.316,23.94 C33.678,23.4 32.998,22.864 32.29,22.33 L32.29,22.33 Z M12.229,22.324 C11.693,22.728 11.175,23.134 10.68,23.54 C10.084,24.025 9.518,24.513 8.98,25.001 C9.37,25.354 9.776,25.708 10.198,26.063 C10.836,26.6 11.516,27.136 12.224,27.671 C12.19,26.796 12.172,25.905 12.172,25 C12.172,24.781 12.172,24.563 12.178,24.348 C12.183,23.664 12.202,22.991 12.228,22.324 L12.229,22.324 Z M28.892,13.488 C28.583,13.588 28.273,13.692 27.961,13.801 C27.041,14.119 26.109,14.481 25.163,14.877 C25.097,14.905 25.029,14.937 24.963,14.964 C25.737,15.373 26.516,15.802 27.299,16.255 C27.339,16.278 27.382,16.301 27.422,16.328 C28.162,16.754 28.88,17.197 29.589,17.645 C29.491,16.859 29.379,16.095 29.254,15.358 C29.144,14.714 29.02,14.093 28.892,13.488 L28.892,13.488 Z M15.62,13.488 C15.486,14.121 15.36,14.775 15.247,15.45 C15.127,16.154 15.025,16.887 14.932,17.634 C15.638,17.188 16.363,16.747 17.108,16.314 L17.214,16.255 C17.994,15.804 18.779,15.375 19.562,14.964 C18.852,14.664 18.155,14.386 17.472,14.132 C16.84,13.894 16.225,13.683 15.62,13.488 L15.62,13.488 Z' id='Shape'%3E%3C/path%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E") !important;
}
</style>
