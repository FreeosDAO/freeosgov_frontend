<template>
  <div>
    <div>
      <q-toolbar-title v-if="username" class="q-mr-md q-mt-xs">
        <q-avatar>
          <q-icon size='md' name="face" />
        </q-avatar>
        {{username}}
      </q-toolbar-title>
    </div>
    <q-btn no-caps flat v-if="!username" @click="isShowDialog=true">Login</q-btn>
    <q-dialog
      v-model="isShowDialog"
      full-width
    >
      <q-card
        style="min-width: 23rem;"
      >
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Connect To Wallet</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          <div class="q-gutter-lg text-center">
            <q-btn color="dark" label="Proton Wallet" @click="onLogin()" />
            <q-btn color="dark" label="Anchor" />
<!--            <q-btn color="dark" label="Scatter" />-->
            <Login></Login>
            <q-btn color="dark" label="Ledger S/X" />
            <q-btn color="dark" label="Trezor" />
            <q-btn color="dark" label="SimplEOS" />
            <q-btn color="dark" label="Lynx" />
            <q-btn color="dark" label="cleos/eosc" />
          </div>
          <div class="q-mt-lg text-center">
            Don't have a wallet? <span class="text-primary">Create A New Wallet.</span> By connecting a wallet provider, I accept <span class="text-primary">Terms.</span>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>
<script>
import Login from 'components/wallets/Login'

export default {
  name: 'WalletLoginDialog',
  components: {
    Login
  },
  data () {
    return {
      username: '',
      isShowDialog: false
    }
  },
  methods: {
    onLogin () {
      this.onSigninFinish({
        isFinished: true,
        username: 'Test Name'
      })
    },
    onSigninFinish (event) {
      if (event.isFinished) {
        this.username = event.username
        this.isShowDialog = false
        this.$emit('onSigninFinish', {
          isFinished: event.isFinished,
          username: event.username
        })
      }
    }
  }
}
</script>

<style>
</style>
