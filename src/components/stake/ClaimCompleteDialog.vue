<template>
  <q-dialog v-model="isModalOpen">
    <q-card>
      <q-card-actions align="right">
        <!-- <q-btn flat label="Close" color="primary" v-close-popup /> -->
        <q-icon class="cursor-pointer text-h5" name="close" v-close-popup/>
      </q-card-actions>
      <q-card-section class="flex justify-center column items-center">
        <div class="text-h4 text-center">Wohoo!</div>
        <div class="col-6">
          You earned:
        </div>
        <div style="width: 400px;
        height: 100px;">
          <q-img src="../../assets/fireworks.svg" />
        </div>
        <div class="text-center q-pb-lg">
           <span class="text-h4 text-weight-bold">250</span>
           <br />
          <span class="text-subtitle2">FREEOS</span>
        </div>
      </q-card-section>

    </q-card>
  </q-dialog>
</template>
<script>
export default {
  props: {
    isOpen: {
      type: Boolean
    }
  },
  computed: {
    isModalOpen: {
      get: function () {
        return this.isOpen
      },
      set: function (val) {
        this.isOpen = val
      }
    }
  },
  data () {
    return {
      unstakeAmount: null
    }
  }
}
</script>
