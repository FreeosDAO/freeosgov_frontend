<template>
  <div class="panel-wrap" v-if="!isVerified">
    <q-card class="panel">
      <div class="text-h4 text-center q-pa-lg">Sorry You are Not Verifed</div>

      <div class="text-h5 text-center q-mt-md q-py-md bg-primary text-white">
        {{ message }}
      </div>

      <div class="q-pa-lg">
        <p class="text-h5 q-mb-xs q-mt-none text-center">
          Verify your account at
          <a target="_black" href="https://identity.metalx.com/"
            >identity.metalx.com</a
          >
        </p>

        <p class="text-body2 q-mb-md q-mt-md  text-center">
          <a
            target="_black"
            href="https://docs.freeos.io/d/h/6k0z3-408/43bbcca7c54387a/6k0z3-1502"
            >How to verify your account?</a
          >
        </p>
      </div>
    </q-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "GetVerified",
  props: {
    message: {
      type: String,
      default: "Get Verified!"
    }
  },
  computed: {
    ...mapGetters("freeos", ["isVerified"])
  }
};
</script>
