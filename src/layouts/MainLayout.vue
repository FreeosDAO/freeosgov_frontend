<template>
  <q-layout view="hHh Lpr fFf">

    <q-header reveal elevated class="bg-primary" height-hint="98">
      <q-toolbar style="justify-content: space-between;">
        <q-btn :style="'visibility: ' + (isAuthenticated ? 'visible' : 'hidden')" dense flat round icon="menu" @click="drawer = !drawer" />
        <div style="display: flex; align-items: center;">
          <div v-if="isAuthenticated" style="margin-right: 1rem;">{{accountName}}</div>
          <q-btn color="primary" label="Connect Wallet" v-if="!isAuthenticated" @click="() => connectWallet('anchor')">
          </q-btn>
          <q-btn v-if="isAuthenticated" style="justify-self: flex-end;" @click="() => logout()">Logout</q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      :width="200"
      :breakpoint="800"
      bordered
      content-class="bg-grey-0"
    >
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList">
            <q-item :key="index" clickable :active="selectedItemLabel === menuItem.label" active-class="bg-grey-4" v-ripple @click="onSelectMenu(menuItem)">
                <q-item-section avatar>
                  <q-icon :name="menuItem.icon" />
                </q-item-section>
                <q-item-section>
                  {{ menuItem.label }}
                </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <div class="text-center q-ma-md row">
        <div class="col-md-5"></div>
        <div class="col-xs-12 col-md-2 q-mb-md">
          <img width="110" src="~assets/freeos_icon.png">
        </div>
      </div>
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-dark text-white" >
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar >
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
<script>
// import WalletLoginDialog from 'components/accountManagement/WalletLoginDialog'
import { mapState, mapActions, mapGetters } from 'vuex'

const menuList = [
  {
    icon: 'monetization_on',
    label: 'Claim',
    separator: true,
    route: '/claim'
  },
  {
    icon: 'swap_horiz',
    label: 'Transfer',
    separator: true,
    route: '/transfer'
  },
  {
    icon: 'get_app',
    label: 'Stake',
    separator: true,
    route: '/stake'
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
    ...mapGetters('account', ['isAuthenticated', 'connecting'])
  },
  components: {
    //Balance
  },
  methods: {
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
    isAuthenticated: {
      immediate: true,
      handler: function (val) {
        if (val && this.accountName) {
          //this.getAccountInfo()
          //this.getClaimDetailInfo(this.iterationNumber)
        }
        if (val && this.$route.query.returnUrl) {
          this.$router.push({ path: this.$route.query.returnUrl })
        }
      }
    }
  },
  created () {
    //this.getClaimCalendar()
    this.checkIfLoggedIn()
  }
}
</script>

<style lang="scss">
</style>
