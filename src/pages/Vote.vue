<template>
  <div class="q-pa-md">
    <CompleteDialog ref="complete" />
    <div class="q-gutter-y-md q-mx-auto" style="max-width: 600px">
      <form class="panel-wrap" novalidate>
        <q-card class="panel q-pa-lg">
          <div class="text-h4 text-center q-ma-lg">Vote on Locking Threshold</div>

          <div class="panel panel-strong q-pa-lg text-center q-mb-lg q-pa-lg">
            <p class="q-mb-sm text-subtitle1" style="line-height:1.4;">
              <strong>Current Locking Threshold:</strong>
            </p>
            <h4 class="text-h4 q-ma-xs" style="line-height:1;">{{ targetPrice }} USD</h4>
          </div>


          <p class="text-subtitle1 q-mb-md" style="line-height:1.2"><strong>What price should the Locking Threshold be
              this week?</strong></p>

          <p class="q-mb-lg">
            Increasing the Locking Threshold may help support the price of {{ currencyName }}. However you may end up with
            more of your {{ tokenCurrencyName }} Locked. For more information <router-link to="/info#vested-options">click
              here</router-link>
          </p>


          <section v-if="userHasVoted">
            <div class="panel panel-info q-pa-lg text-center q-mb-lg q-pa-lg">
              <p class="q-mb-md text-h4" style="line-height:1.2;">You Voted!</p>
              <p class="q-mb-sm text-subtitle1" style="line-height:1.4;">Thanks for Voting this week</p>
            </div>

          </section>

          <section v-if="userHasStakedORHasAirkey && !userHasVoted">
            <div class="q-px-md q-py-sm">
              <q-slider v-model="lockingThresholdVote" :min="thresholdRangeLower" :max="thresholdRangeUpper()"
                :step="0.000001" marker-labels label :label-always="!!lockingThresholdVote" track-size="5px"
                thumb-size="28px" />
            </div>

            <div style="align-items: center;" class="row justify-center q-mb-sm q-pb-xs">
              <div class="col-xs-8 col-sm-7 text-sm">Or manually enter amount:</div>
              <div class="col-xs-1"></div>
              <div class="col-xs-3 col-sm-4">
                <label data-v-052b630f for="f_6eee53df-da8d-4f65-9fad-d55fd4c1e7e7"
                  class="q-field row no-wrap items-start q-input q-field--outlined q-field--dense q-validation-component">
                  <div class="q-field__inner relative-position col self-stretch">
                    <div tabindex="-1" class="q-field__control relative-position row no-wrap">
                      <div
                        class="q-field__control-container col relative-position row no-wrap q-anchor--skip max-btn-holder">
                        <input novalidate="true" style="text-align: center;" v-model="lockingThresholdVote" tabindex="0"
                          id="f_6eee53df-da8d-4f65-9fad-d55fd4c1e7e7" type="number"
                          class="q-field__native q-placeholder" />
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <p class="text-center text-negative q-mt-none q-mb-sm"
              v-if="lockingThresholdVoteInvalid && lockingThresholdVote !== 0">Locking Threshold must be between
              {{ thresholdRangeLower }} and {{ thresholdRangeUpper() }}</p>

            <div style="align-items: center;" class="row justify-center q-mt-md q-mb-sm q-pb-none">
              <q-btn size="lg" unelevated no-caps outline
                :disable="!userHasStakedORHasAirkey || userHasVoted || !lockingThresholdVote || airclaimStatus !== 'Running' || voteWatcher" color="primary" @click="submit()">
                Submit Vote</q-btn>
            </div>
          </section>
        </q-card>
      </form>
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
  name: 'Vote',
  data() {
    return {
      lockingThresholdVote: 0,
      stakeCurrency: process.env.STAKING_CURRENCY,
      currencyName: process.env.CURRENCY_NAME,
      tokenCurrencyName: this.$options.filters.capitalize(process.env.TOKEN_CURRENCY_NAME),
      thresholdRangeLower: parseFloat(process.env.VOTETHRESHOLDLOWER),
      voteWatcher: false
    }
  },
  components: {
    CompleteDialog
  },
  computed: {
    ...mapGetters('freeos', ['airclaimStatus', 'userHasVoted', 'airkeyBalance', 'lockFactor', 'userHasStaked', 'isAuthenticated', 'accountName', 'isRegistered', 'stakeRequirement', 'isFreeosEnabled', 'totalFreeos', 'liquidFreeos', 'liquidOptions', 'canClaim', 'reasonCannotClaim', 'currentIteration', 'nextIteration', 'airkeyBalance', 'airclaimStatus', 'currentPrice', 'targetPrice']),
     userHasStakedORHasAirkey() {
       return this.userHasStaked || this.airkeyBalance
    },
    lockingThresholdVoteInvalid() {
      var val = parseFloat(this.lockingThresholdVote)
      if (typeof val !== 'number' || val < this.thresholdRangeLower || val > this.thresholdRangeUpper()) {
        return true;
      } else {
        return false;
      }
    }
  },
  created: function () {
      this.lockingThresholdVote = (this.thresholdRangeUpper() + this.thresholdRangeLower) / 2;
  },
  watch: {
    /*lockingThresholdVote(newValue, oldValue) {
      var val = parseFloat(newValue);
      console.log('lT Changed')
      if (typeof val !== 'number' || val < this.thresholdRangeLower || val > this.thresholdRangeUpper) {
        this.lockingThresholdVoteInvalid = true;
      } else {
        this.lockingThresholdVoteInvalid = false;
      }
    }*/
  },
  methods: {
    ...mapActions('freeos', ['vote']),
    thresholdRangeUpper() {
      return this.currentPrice < this.thresholdRangeLower ? Math.floor(parseFloat(this.lockFactor) * this.thresholdRangeLower * 10000000) / 10000000 : Math.floor(parseFloat(this.lockFactor) * this.currentPrice * 10000000) / 10000000;
    },
    async submit() {
      if (this.userHasStakedORHasAirkey && this.lockingThresholdVote) {
        const _ = this;
        this.voteWatcher = true
        var result = await _.vote({ user: this.accountName, q3response: this.lockingThresholdVote })
        if (!(result instanceof Error)) {
          this.$refs.complete.openDialog({
            title: "Woohoo", subtitle: "Thanks for Voting!", text: "You Voted:", value: this.lockingThresholdVote, currency: "USD"
          });
        }
        this.voteWatcher = false
      }
    },
  }
}
</script>

<style>
.q-slider__marker-labels-container .q-slider__marker-labels {
  display: none;
  font-size: 12px;
}

.q-slider__marker-labels-container .q-slider__marker-labels:first-child,
.q-slider__marker-labels-container .q-slider__marker-labels:last-child {
  display: block;
  line-height: 1;
}
</style>
