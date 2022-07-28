<template>
<div class="q-pa-md">
    <div class="q-gutter-y-md q-mx-auto" style="max-width: 600px">
        <div class="panel-wrap">
            <q-card class="panel  q-pa-lg">
                <div class="text-h4 text-center q-ma-lg">Registration</div>
                 <p class="q-mb-md text-center" style="line-height:1.4;">
                    For more info, <a target="_blank" title="Info on registration" href="https://docs.freeos.io/d/h/6k0z3-408/43bbcca7c54387a/6k0z3-1382">click here</a>
                </p>

             <q-checkbox id="termsCheckbox" v-model="termsCheckbox" /><label  for="termsCheckbox">I accept Freeos's <a class="cursor-pointer" style="text-decoration:underline" target="_blank" href="https://www.freedao.io/t-cs">Terms of Service</a></label>

            <q-card-actions align="center">
                <q-btn :disabled="!termsCheckbox" unelevated size="lg" class="q-mb-m" outline color="primary" @click="submit()">ReRegister</q-btn>
            </q-card-actions>
            <q-card-actions align="center">
                <q-btn :disabled="!termsCheckbox" unelevated size="lg" class="q-mb-m" outline color="primary" @click="submit()">Register</q-btn>
            </q-card-actions>
            </q-card>

            <CompleteDialog  ref="complete"  />
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

import CompleteDialog from 'src/components/CompleteDialog.vue'

export default {
    name: 'Re-register',
    data() {
        return {
            termsCheckbox:false,
            showTerms: false, 
        }
    },
    components: {
        CompleteDialog
    },
    computed: {
        ...mapGetters('freeos', ['accountName', 'XPRBalance', 'liquidFreeos', 'isAuthenticated']),
    },
    methods: {
        ...mapActions('freeos', ['reregister','register']),
        async submit() {
            var result = await this.reregister();
            console.log('registerResult', result)
            if (!(result instanceof Error)) {
                this.$refs.complete.openDialog({
                    title: 'Woohoo!', subtitle: 'You have successfully re-registered', text: null, value: null, currency: null, time: 3000, closeFunc: ()=>{
                    }
                });
            }
        },
        async register() {
            var result = await this.register();
            console.log('registerResult', result)
            if (!(result instanceof Error)) {
                this.$refs.complete.openDialog({
                    title: 'Woohoo!', subtitle: 'You have successfully re-registered', text: null, value: null, currency: null, time: 3000, closeFunc: ()=>{
                    }
                });
            }
        },
    }
}
</script>

<style scoped>

</style>
