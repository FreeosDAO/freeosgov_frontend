<template>
<div class="q-pa-md">
    <div class="q-gutter-y-md q-mx-auto" style="max-width: 600px">
        <div class="panel-wrap">
            <q-card class="panel  q-pa-lg">
                <div class="text-h4 text-center q-ma-lg">Re-register</div>
                <p class="text-subtitle1 q-mt-xl">Some info about what re-registering is</p>
                <q-btn class="q-mt-md" size="lg" unelevated no-caps outline color="primary" @click="submit()">Re-Register</q-btn>

            </q-card>
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

export default {
    name: 'Re-register',
    data() {
        return {

        }
    },
    computed: {
        ...mapGetters('freeos', ['accountName', 'XPRBalance', 'liquidFreeos', 'isAuthenticated']),
    },
    methods: {
        ...mapActions('freeos', ['register']),
        async submit() {
            var result = await this.register();
            console.log('registerResult', result)
            if(result){

            }
        },
    }
}
</script>

<style scoped>

</style>
