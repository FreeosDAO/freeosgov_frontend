<template>
  <q-dialog v-model="isShowUnstakeDialog">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-center">Please check transaction details below</div>
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 50vh" class="scroll">
        <div class="row q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
          <div class="col-6">
            From:
          </div>
          <div class="col-6">
            asdgfhtj37kd
          </div>
        </div>
        <div class="row q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
          <div class="col-6">
            Unstake:
          </div>
          <div class="col-6">
            {{ unstakeAmount }} EOS
          </div>
        </div>
        <div class="row q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
          <div class="col-6">
            Date/time:
          </div>
          <div class="col-6">
            8.11.2020 / 6:16
          </div>
        </div>
        <div class="q-mt-xl">
          Please note that unstaking operation takes 3 weeks. You can cancel unstaking any time. Your funds will be available on your account 29.11.2020
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="Cancel" color="negative" v-close-popup />
        <q-btn flat label="Confirm" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  data () {
    return {
      isShowUnstakeDialog: false,
      unstakeAmount: null
    }
  }
}
</script>
