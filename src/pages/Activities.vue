<template>
  <div class="q-pa-md">
    <CompleteDialog ref="complete" />
    <div class="q-gutter-y-md q-mx-auto" style="max-width: 600px">
      <p class="text-body3 q-mb-xs text-center">
        {{ priceLabel }}{{ currentPrice }}
        <q-icon v-if="currentPrice >= targetPrice" size="xs" name="arrow_upward" />
        <q-icon v-if="currentPrice < targetPrice" size="xs" name="arrow_downward" />
      </p>








      <div v-if="surveyCompleted && surveyPeriodActive" class="panel-wrap">
        <q-card class="panel q-pa-lg">
          <div class="text-h4 text-center q-ma-lg">Wahoo</div>
          <svg class="happy-stickman" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 170.1 170.1"
            style="enable-background:new 0 0 170.1 170.1;" xml:space="preserve">
            <g id="Ellipse_45" transform="translate(28.411 7.976)">
              <ellipse class="st0" cx="60.5" cy="40" rx="11.9" ry="11.5" />
              <ellipse class="st1" cx="60.5" cy="40" rx="9.9" ry="9.5" />
            </g>
            <path id="Path_389" class="st1" d="M85.1,58.5c-7,12.9-7.6,28.2-1.7,41.6" />
            <path id="Path_390" class="st2" d="M82.4,100.1c-12,8,2.6,36.8,2.6,36.8L80,139" />
            <path id="Path_391" class="st3" d="M118.4,89.3l-2.1,6.5c0,0-11.8-12.5-32.8,3.3" />
            <path id="Path_392" class="st3" d="M51.2,44.4l7.6,18l21.7,6.1" />
            <path id="Path_393" class="st3" d="M115,37.3l-2.5,15.2L80.7,68.9" />
            <path class="st4" d="M93.4,49.8c-0.7,1.8-2.5,3-4.5,3c-2.7,0-4.8-2.2-4.8-4.8c0,0,0,0,0-0.1" />
          </svg>

          <div class="text-subtitle1 text-center q-ma-lg">Thanks for participating in this weeks survey</div>
          <div class="text-h4 text-center q-ma-lg">Next: The Weekly Vote</div>
          <div class="text-subtitle1 text-center q-ma-lg">Starts In <span
              v-html="$options.filters.secondsToDhms(voteStartsIn)"></span></div>


          <div class="text-subtitle1 text-center q-ma-lg">Completing the vote enables you to claim an additional {{voteShare}}% of your weekly claim potential </div>
          <div class="text-subtitle1 text-center q-ma-lg">See you soon for the VOTE</div>
        </q-card>
      </div>




      <q-form v-if="!surveyCompleted && surveyPeriodActive" ref="myForm" class="panel-wrap" @submit="submitSurvey()"
        @validation-error="onValidationError">
        <q-card class="panel q-pa-lg">
          <div class="text-h4 text-center q-ma-lg">Welcome to the Survey</div>
          <div class="text-sm text-center q-ma-lg">Participate for {{ surveyShare }}% of your weekly Claim</div>

          <div class="text-subtitle1 text-center q-ma-lg">Survey Closes in: <span
              v-html="$options.filters.secondsToDhms(surveyClosesIn)"></span></div>

          <p>Thank you for being part of FREEOS community who actively stewards this economy. Besides empowering your
            own financial freedom, your answers also affect the FREEOS community. The bonus is your participation is
            rewarded when you ‘Claim’. Initially, it may take some take the time to understand each economic tool - but
            that will change. For more info refer to:</p>

          <p class="text-subtitle1 text-center q-ma-lg">Ready? Let’s start</p>

          <section>

            <div class="panel panel-strong q-pa-lg text-center q-mb-lg q-pa-lg">
              <p class="text-subtitle1 q-mb-none" style="line-height:1.4;">
                <strong>Q1: Wider Crypto Economy Sentiment</strong>
              </p>
            </div>

            <p>Do you feel the Bitcoin (BTC) and wider crypto market is a growing (bull market), shrinking (bear market)
              or neither (going sideways)?</p>


            <div class="q-pa-sm q-mb-lg">
              <q-field borderless ref="surveyq1response" :value="surveyq1response" lazy-rules
                :rules="[val => val || 'Please Select an Option']">
                <template v-slot:control>
                  <q-option-group required v-model="surveyq1response" :options="surveyq1options" />
                </template>
              </q-field>
            </div>

          </section>
          <section>
            <div class="panel panel-strong q-pa-lg text-center q-mb-lg q-pa-lg">
              <p class="q-mb-none text-subtitle1" style="line-height:1.4;">
                <strong>Q2: Crypto Market Change of Direction</strong>
              </p>
            </div>
            <p>How long will the above Bitcoin and crypto market last before it changes direction?</p>


            <div class="q-px-md q-py-sm">
              <q-slider v-model="surveyq2response" :min="thresholdRangeLower" :max="thresholdRangeUpper" required :step="1"
                marker-labels label :label-always="!!surveyq2response" track-size="5px" thumb-size="22px" />
            </div>
            <div class="panel q-pa-sm text-center q-mb-lg"><strong>{{ surveyq2response }} months</strong></div>
          </section>
          <section>
            <div class="panel panel-strong q-pa-lg text-center q-mb-lg q-pa-lg">
              <p class="q-mb-none text-subtitle1" style="line-height:1.4;">
                <strong>Q3: FREEOS Economy Sentiment</strong>
              </p>
            </div>

            <p>Do you feel the Freeos economy is a growing (bull market), shrinking (bear market) or neither (going
              sideways)?</p>

            <div class="q-pa-sm q-mb-lg">
              <q-field borderless ref="surveyq3response" :value="surveyq3response" lazy-rules
                :rules="[val => val || 'Please Select an Option']">
                <template v-slot:control>
                  <q-option-group required v-model="surveyq3response" :options="surveyq1options" />
                </template>
              </q-field>
            </div>
          </section>
          <section>

            <div class="panel panel-strong q-pa-lg text-center q-mb-lg q-pa-lg">
              <p class="q-mb-none text-subtitle1" style="line-height:1.4;">
                <strong>Q4: FREEOS Change of Direction</strong>
              </p>
            </div>

            <p>How long will the above Freeos market last before it changes direction?</p>
            <div class="q-px-md q-py-sm">
              <q-slider v-model="surveyq4response" :min="thresholdRangeLower" :max="thresholdRangeUpper" required :step="1"
                marker-labels label :label-always="!!surveyq4response" track-size="5px" thumb-size="22px" />
            </div>
            <div class="panel q-pa-sm text-center q-mb-lg">{{ surveyq4response }} months</div>

            <div class="panel panel-strong q-pa-lg text-center q-mb-lg q-pa-lg">
              <p class="q-mb-none text-subtitle1" style="line-height:1.4;">
                <strong>Q5: Priorities for Voting</strong>
              </p>
            </div>

          </section>
          <section>
            <p>Select your top three priorities for this weeks vote from the following economic tools</p>

            <ul>
              <li>Growing the participants</li>
              <li>Stabilising the price</li>
              <li>Raising the Locking Threshold</li>
            </ul>

            <q-select lazy-rules :rules="[val => val || 'Please Select an Option']" required emit-value map-options
              outlined v-model="surveyq5choice1" :options="surveyq5options1" label="Select Priority 1" />
            <q-select class="q-mt-sm" lazy-rules :rules="[val => val || 'Please Select an Option']" required
              :disable="surveyq5choice1 === null" emit-value map-options outlined v-model="surveyq5choice2" :options="surveyq5options2"
              label="Select Priority 2" />
            <q-select class="q-mt-sm q-mb-lg" lazy-rules :rules="[val => val || 'Please Select an Option']" required
              :disable="surveyq5choice2 === null" emit-value map-options outlined v-model="surveyq5choice3" :options="surveyq5options3"
              label="Select Priority 3" />
          </section>

          <div style="align-items: center;" class="row justify-center q-mt-md q-mb-sm q-pb-none">
            <q-btn size="lg" unelevated no-caps outline :disable="!surveyPeriodActive || surveyCompleted"
              color="primary" type="submit">
              Submit Survey</q-btn>
          </div>

        </q-card>
      </q-form>




 <q-form v-if="!voteCompleted && votePeriodActive" ref="myForm" class="panel-wrap" @submit="submitVote()"
        @validation-error="onValidationError">
        <q-card class="panel q-pa-lg">
          <div class="text-h4 text-center q-ma-lg">Welcome to the Vote</div>
          <div class="bar-light text-sm text-center q-ma-lg">Participate for {{ voteShare }}% of your weekly Claim</div>

          <div class="bar-dark text-subtitle1 text-center q-ma-lg">Vote Closes in: <span
              v-html="$options.filters.secondsToDhms(voteClosesIn)"></span></div>

          <p>Thanks for being active in stewarding this economy. Besides empowering your own financial freedom, your answers also affect the FREEOS community. The bonus is your participation is rewarded when you ‘Claim’. Initially, it may take some take the time to understand each economic tool - but that will change. For more info refer to:</p>

          <p class="text-subtitle1 text-center q-ma-lg">Ready? to Vote Let’s start</p>
<!--
          <section>

            <div class="panel panel-strong q-pa-lg text-center q-mb-lg q-pa-lg">
              <p class="text-subtitle1 q-mb-none" style="line-height:1.4;">
                <strong>Q1: Wider Crypto Economy Sentiment</strong>
              </p>
            </div>

            <p>Do you feel the Bitcoin (BTC) and wider crypto market is a growing (bull market), shrinking (bear market)
              or neither (going sideways)?</p>


            <div class="q-pa-sm q-mb-lg">
              <q-field borderless ref="surveyq1response" :value="surveyq1response" lazy-rules
                :rules="[val => val || 'Please Select an Option']">
                <template v-slot:control>
                  <q-option-group required v-model="surveyq1response" :options="surveyq1options" />
                </template>
              </q-field>
            </div>

          </section>
          <section>
            <div class="panel panel-strong q-pa-lg text-center q-mb-lg q-pa-lg">
              <p class="q-mb-none text-subtitle1" style="line-height:1.4;">
                <strong>Q2: Crypto Market Change of Direction</strong>
              </p>
            </div>
            <p>How long will the above Bitcoin and crypto market last before it changes direction?</p>


            <div class="q-px-md q-py-sm">
              <q-slider v-model="surveyq2response" :min="thresholdRangeLower" :max="thresholdRangeUpper" required :step="1"
                marker-labels label :label-always="!!surveyq2response" track-size="5px" thumb-size="22px" />
            </div>
            <div class="panel q-pa-sm text-center q-mb-lg"><strong>{{ surveyq2response }} months</strong></div>
          </section>
          <section>
            <div class="panel panel-strong q-pa-lg text-center q-mb-lg q-pa-lg">
              <p class="q-mb-none text-subtitle1" style="line-height:1.4;">
                <strong>Q3: FREEOS Economy Sentiment</strong>
              </p>
            </div>

            <p>Do you feel the Freeos economy is a growing (bull market), shrinking (bear market) or neither (going
              sideways)?</p>

            <div class="q-pa-sm q-mb-lg">
              <q-field borderless ref="surveyq3response" :value="surveyq3response" lazy-rules
                :rules="[val => val || 'Please Select an Option']">
                <template v-slot:control>
                  <q-option-group required v-model="surveyq3response" :options="surveyq1options" />
                </template>
              </q-field>
            </div>
          </section>
          <section>

            <div class="panel panel-strong q-pa-lg text-center q-mb-lg q-pa-lg">
              <p class="q-mb-none text-subtitle1" style="line-height:1.4;">
                <strong>Q4: FREEOS Change of Direction</strong>
              </p>
            </div>

            <p>How long will the above Freeos market last before it changes direction?</p>
            <div class="q-px-md q-py-sm">
              <q-slider v-model="surveyq4response" :min="thresholdRangeLower" :max="thresholdRangeUpper" required :step="1"
                marker-labels label :label-always="!!surveyq4response" track-size="5px" thumb-size="22px" />
            </div>
            <div class="panel q-pa-sm text-center q-mb-lg">{{ surveyq4response }} months</div>

            <div class="panel panel-strong q-pa-lg text-center q-mb-lg q-pa-lg">
              <p class="q-mb-none text-subtitle1" style="line-height:1.4;">
                <strong>Q5: Priorities for Voting</strong>
              </p>
            </div>

          </section>
          <section>
            <p>Select your top three priorities for this weeks vote from the following economic tools</p>

            <ul>
              <li>Growing the participants</li>
              <li>Stabilising the price</li>
              <li>Raising the Locking Threshold</li>
            </ul>

            <q-select lazy-rules :rules="[val => val || 'Please Select an Option']" required emit-value map-options
              outlined v-model="surveyq5choice1" :options="surveyq5options1" label="Select Priority 1" />
            <q-select class="q-mt-sm" lazy-rules :rules="[val => val || 'Please Select an Option']" required
              :disable="surveyq5choice1 === null" emit-value map-options outlined v-model="surveyq5choice2" :options="surveyq5options2"
              label="Select Priority 2" />
            <q-select class="q-mt-sm q-mb-lg" lazy-rules :rules="[val => val || 'Please Select an Option']" required
              :disable="surveyq5choice2 === null" emit-value map-options outlined v-model="surveyq5choice3" :options="surveyq5options3"
              label="Select Priority 3" />
          </section>
-->
          <div style="align-items: center;" class="row justify-center q-mt-md q-mb-sm q-pb-none">
            <q-btn size="lg" unelevated no-caps outline :disable="!votePeriodActive || voteCompleted"
              color="primary" type="submit">
              Submit Vote</q-btn>
          </div>

        </q-card>
      </q-form>






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
      name: '',
      surveyq1response: null,
      surveyq1options: [
        { label: 'Growing (bull market)', value: 1 },
        { label: 'Shrinking (bear market)', value: 2 },
        { label: 'Neither (going sideways)', value: 3 }
      ],
      surveyq5options1: [
        { label: 'Growing the participants', value: 1 },
        { label: 'Stabilising the price', value: 2 },
        { label: 'Raising the Locking Threshold', value: 3 }
      ],
      surveyq2response: null,
      surveyq3response: null,
      surveyq4response: null,
      surveyq5choice1: null,
      surveyq5choice2: null,
      surveyq5choice3: null,
      lockingThresholdVote: 0,
      stakeCurrency: process.env.STAKING_CURRENCY,
      currencyName: process.env.CURRENCY_NAME,
      tokenCurrencyName: "XPR",//this.$options.filters.capitalize(process.env.TOKEN_CURRENCY_NAME),
      thresholdRangeLower: 1,
      thresholdRangeUpper: 24,
      voteWatcher: false
    }
  },
  components: {
    CompleteDialog
  },
  computed: {
    ...mapGetters('freeos', [
      'currentPrice',
      'targetPrice',
      'priceLabel',
      'airkeyBalance',
      'dparameters',
      'surveyShare',
      'voteShare',
      'surveyClosesIn',
      'surveyPeriodActive',
      'surveyCompleted',
      'voteStartsIn',
      'voteClosesIn',
      'votePeriodActive',
      'voteCompleted',
      'ratifyCompleted',
      'userHasStaked', 'userHasVoted', 'isAuthenticated', 'accountName', 'isRegistered', 'stakeRequirement', 'isFreeosEnabled', 'totalFreeos', 'liquidFreeos', 'liquidOptions', 'canClaim', 'reasonCannotClaim', 'currentIteration', 'nextIteration', 'airkeyBalance', 'airclaimStatus', 'currentPrice', 'targetPrice']),
    userHasStakedORHasAirkey() {
      return this.userHasStaked || this.airkeyBalance
    },
    surveyq5options2() {
      return this.surveyq5options1.filter(q => q.value !== this.surveyq5choice1);
    },
    surveyq5options3() {
      return this.surveyq5options1.filter(q => q.value !== this.surveyq5choice1 && q.value !== this.surveyq5choice2);
    },
  },
  created: function () {
    this.surveyq2response = this.thresholdRangeUpper / 2;
    this.surveyq4response = this.thresholdRangeUpper / 2;
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
    ...mapActions('freeos', ['survey']),
    /* thresholdRangeUpper() {
      return this.currentPrice < this.thresholdRangeLower ? Math.floor(parseFloat(this.lockFactor) * this.thresholdRangeLower * 10000000) / 10000000 : Math.floor(parseFloat(this.lockFactor) * this.currentPrice * 10000000) / 10000000;
    },*/
    async onValidationError(ref) {
      console.log('ref', ref.$refs.target);
      const el = ref.$refs.target;
      el.scrollIntoView();
    },
    async submitSurvey() {
      const _ = this;
      console.log(this.surveyPeriodActive, this.surveyCompleted);

      var result = await _.survey({
        user: this.accountName,
        q1response: this.surveyq1response,
        q2response: this.surveyq2response,
        q3response: this.surveyq3response,
        q4response: this.surveyq4response,
        q5choice1: this.surveyq5choice1,
        q5choice2: this.surveyq5choice2,
        q5choice3: this.surveyq5choice3
      })
      if (!(result instanceof Error)) {
        this.$refs.complete.openDialog({
          title: "Woohoo", subtitle: "You earned", value: this.currentIteration.claim_amount
        });
      }



    },
  }
}
</script>

<style>
.happy-stickman .st0 {
  fill: #FFFFFF;
}

.happy-stickman .st1 {
  fill: none;
  stroke: #45A1E7;
  stroke-width: 4;
}

.happy-stickman .st2 {
  fill: none;
  stroke: #45A1E7;
  stroke-width: 4.0021;
  stroke-linecap: round;
  stroke-miterlimit: 4.0021;
}

.happy-stickman .st3 {
  fill: none;
  stroke: #45A1E7;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.happy-stickman .st4 {
  fill: none;
  stroke: #45A1E7;
  stroke-linecap: round;
}

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
