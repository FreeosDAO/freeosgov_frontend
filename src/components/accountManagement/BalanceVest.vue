<template>
  <div class="row">
    <div class="col-5 text-grey">Vested FREEOS: </div>
    <div class="col-5 text-grey text-weight-bold">{{vestedOptions}}</div>
    <div class="col-2">
      <q-btn
        size="sm"
        label="Unvest"
        color="primary"
        no-caps
      />
    </div>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState('freeos', ['vestedOptions'])

  },
  methods: {
    ...mapActions({
      // unvest: 'vest/unVest',
    })
  },
  mounted () {

  }
}
</script>
