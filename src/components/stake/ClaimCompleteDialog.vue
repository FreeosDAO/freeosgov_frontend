<template>
  <q-dialog v-model="isModalOpen">
    <q-card>
      <q-card-section>
        <div class="text-h6 text-center">Wohoo!</div>
      </q-card-section>

      <q-separator />

      <q-card-section style="max-height: 50vh" class="scroll">
        <div class="row q-pl-md q-pr-md q-ml-md q-mr-md q-pb-xs">
          <div class="col-6">
            You earned:
          </div>
          <div class="col-6">
            250<br />
            FREEOS
          </div>
        </div>

      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn flat label="Close" color="primary" v-close-popup />
      </q-card-actions>
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
            get:function() {
            return this.isOpen;
            },
            set: function(val) {
                this.isOpen=val;
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
