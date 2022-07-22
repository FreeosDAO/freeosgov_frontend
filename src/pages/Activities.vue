<template>
  <div class="q-pa-md">
    <CompleteDialog ref="complete" />
    <div class="q-gutter-y-md q-mx-auto" style="max-width: 600px">
      <!--<p class="text-body3 q-mb-xs text-center">
        {{ priceLabel }}{{ currentPrice }}
        <q-icon v-if="currentPrice >= targetPrice" size="xs" name="arrow_upward" />
        <q-icon v-if="currentPrice < targetPrice" size="xs" name="arrow_downward" />
      </p>-->

      <!--GET KYC'd-->
      <div class="panel-wrap" v-if="!isVerified">
        <q-card class="panel">
          <div class="text-h4 text-center q-pa-lg">Sorry You are Not Verifed Yet</div>


          <div class="text-h5 text-center q-mt-md q-py-md bg-primary text-white">Get Verified to Vote</div>

          <div class="q-pa-lg">
            <p class="text-h5 q-mb-xs q-mt-none text-center">Verify your account at <a target="_black"
                href="http://protonkyc.com/">protonkyc.com</a></p>

            <p class="text-body2 q-mb-md q-mt-md  text-center"><a target="_black"
                href="https://medium.com/freedao/staking-and-kyc-update-fe5be2985ce6">How to verify your account?</a>
            </p>
          </div>
        </q-card>
      </div>

      <!--THE REGISTRATION-->
      <div class="panel-wrap" v-if="isVerified && !isRegistered">
        <q-card class="panel q-pa-lg">
          <div class="text-h4 text-center">Registration</div>
          <p class="q-mb-md text-center" style="line-height:1.4;">For more info, <router-link to="/info#registration">
              click here</router-link>
          </p>

          <q-checkbox id="termsCheckbox" v-model="termsCheckbox" /><label for="termsCheckbox">I accept Freeos's <a
              class="cursor-pointer" style="text-decoration:underline" target="_blank"
              href="https://www.freedao.io/t-cs">Terms of Service</a></label>

          <q-card-actions align="center">
            <q-btn :disabled="!termsCheckbox" unelevated size="lg" class="q-mb-m" outline color="primary"
              @click="register()">Register</q-btn>
          </q-card-actions>
        </q-card>
      </div>


      <div v-if="isVerified && isRegistered">

        <div v-if="ratifyCompleted && ratifyPeriodActive" class="panel-wrap">
          <q-card class="panel">
            <div class="text-h4 text-center q-ma-lg">Cool burgers!</div>
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

            <div class="text-subtitle2 text-primary text-center q-ma-md">Thanks for participating in the ratification vote
            </div>



            <div class="bg-primary text-h5 text-center text-white q-py-md">Next weeks Survey<br/>Starts in:
              <span v-html="$options.filters.secondsToDhms(ratifyClosesIn)"></span></div>
            
              <div class="q-mt-md text-subtitle1 bg-primary text-white q-px-lg q-py-md text-center"><strong>Completing the weekly survey enables you to claim an additional {{surveyShare}}% of your weekly claim potential</strong></div>


            <div class="text-h5 text-center q-ma-lg">See you soon for the Survey</div>

          </q-card>
        </div>





        <!--THE RATIFICATION-->
        <q-form v-if="!ratifyCompleted && ratifyPeriodActive" class="panel-wrap">
          <q-card class="panel">
            <h4 class="text-h4 text-center q-pa-sm" v-if="voteCompleted">Thanks for Voting, please ratify</h4>
            <h4 class="text-h4 text-center q-pa-sm" v-if="!voteCompleted">You missed the Vote, so you can't ratify this
              week</h4>

            <div v-if="voteCompleted" class="bg-info text-center q-py-md">Complete for {{ ratifyShare }}% of your weekly
              Claim</div>
            <div class="bg-primary text-h5 text-center text-white q-py-md">Ratify Closes in: <span
                v-html="$options.filters.secondsToDhms(ratifyClosesIn)"></span></div>
            <p class="q-pa-lg q-ma-none" v-if="voteCompleted">Since you voted this week, some market changes might altered to effect the community
              decision. Carefully consider the current market with the links below. The ratification vote enables you to
              confirm or void this week's vote…for more information click here</p>
            <div class="text-h5 text-center q-pa-lg">This week's Vote Results</div>

              <div class="text-h5 bg-primary text-white q-px-lg q-py-md">Issuance</div>
              <div v-if="rewardsCurrent && rewardsCurrent['q1average']" class="text-md bg-info q-px-lg q-py-md">
                Current Issuance: <strong>{{ parseFloat(rewardsCurrent['q1average']) }}%</strong>
              </div>
              <div v-if="rewardsPrevious && rewardsPrevious['issuance_rate']" class="text-md q-px-lg q-py-md">
                The Voted Issuance: <strong>{{ parseFloat(rewardsPrevious['issuance_rate']) }}%</strong>
              </div>

              <div class="text-h5 bg-primary text-white q-px-lg q-py-md">Mint Fee</div>
              <div v-if="rewardsCurrent && rewardsCurrent['q2average']" class="text-md bg-info q-px-lg q-py-md">
                Current Mint Fee: <strong>{{ parseFloat(rewardsCurrent['q2average']) }}%</strong>
              </div>
              <div v-if="rewardsPrevious && rewardsPrevious['mint_fee_percent']" class="text-md q-px-lg q-py-md">
                The Voted Mint Fee: <strong>{{ parseFloat(rewardsPrevious['mint_fee_percent']) }}%</strong>
              </div>
              <div class="text-h5 bg-primary text-white q-px-lg q-py-md">Locking Threshold</div>
              <div  v-if="rewardsCurrent && rewardsCurrent['q3average']" class="text-md bg-info q-px-lg q-py-md">
                Current Locking Threshold: <strong>{{ parseFloat(rewardsCurrent['q3average']) }} USD</strong>
              </div>
              <div v-if="rewardsPrevious && rewardsPrevious['locking_threshold']" class="text-md q-px-lg q-py-md">
                The Voted Locking Threshold: <strong>{{ parseFloat(rewardsPrevious['locking_threshold']) }} USD</strong>
              </div>
              <div v-if="voteCompleted" class="q-mt-md text-subtitle1 bg-primary text-white q-px-lg q-py-md text-center"><strong>Do you agree that this weeks VOTE is appropriate today?</strong></div>

              <div rounded v-if="voteCompleted" style="display:flex;justify-content:center;" class="q-pa-md full-width justify-center q-mb-md ">
                <q-btn size="lg" class="q-mr-sm" unelevated no-caps  @click="submitRatify(true)"
                  color="primary">
                  Yes</q-btn>

                <q-btn size="lg" class="q-ml-sm" unelevated no-caps  @click="submitRatify(false)"
                  color="primary">
                  No</q-btn>

              </div>
          </q-card>
        </q-form>


        <!--Vote Completed-->
        <div v-if="voteCompleted && votePeriodActive" class="panel-wrap">
          <q-card class="panel">
            <div class="text-h4 text-center q-ma-lg">Yay, you did it</div>
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

            <div class="text-subtitle2 text-primary text-center q-ma-md">Thanks for participating in this week vote
            </div>
            <div class="bg-primary text-h5 text-center text-white q-py-md">Next: The Ratification Vote</div>
            <div class="bg-info text-h5 text-center q-py-md">Starts In <span
                v-html="$options.filters.secondsToDhms(ratifyStartsIn)"></span></div>


            <div class="bg-primary text-subtitle2 text-white text-center q-py-md q-px-lg">Completing the ratification
              vote
              enables you to claim an additional {{ ratifyShare }}% of your weekly claim potential </div>
            <div class="text-h5 text-center q-ma-lg">See you soon for the Ratification Vote</div>
          </q-card>
        </div>


        <!--THE VOTE-->
        <q-form ref="myForm" v-if="!voteCompleted && votePeriodActive" class="panel-wrap" @submit="submitVote()"
          novalidate>
          <q-card class="panel">
            <div class="text-h4 text-center q-pa-lg">Welcome to the Vote</div>
            <div class="bg-info text-center q-py-md">Complete for {{ voteShare }}% of your weekly Claim</div>

            <div class="bg-primary text-h5 text-center text-white q-py-md">Vote Closes in: <span
                v-html="$options.filters.secondsToDhms(voteClosesIn)"></span></div>


            <section class="q-pa-lg">
              <p>Thanks for being active in stewarding this economy. Besides empowering your own financial freedom, your
                answers also affect the FREEOS community. The bonus is your participation is rewarded when you ‘Claim’.
                Initially, it may take some take the time to understand each economic tool - but that will change. For
                more
                info refer to:</p>
            </section>
            <div class="text-h5 text-center bg-info q-px-lg q-py-md">
              Ready? to Vote Let’s start
            </div>


            <!--Issuance Vote-->
            <article>
              <div class="text-h5 bg-primary text-white q-px-lg q-py-md">Issuance</div>
              <div v-if="rewardsPrevious && rewardsPrevious['issuance_rate']" class="text-md bg-info q-px-lg q-py-md">
                Last weeks Issuance: <strong>{{ parseFloat(rewardsPrevious['issuance_rate']) }}%</strong>
              </div>

              <section class="q-pa-lg">
                <p><strong>What percentage of the issuance should be minted this week?</strong></p>
                <p>Issuance is the amount of Points issued weekly. Minimising the issuance reduces the supply of FREEOS
                  tokens that can be minted. Restricting supply can increase the price when there is suitable demand.
                </p>



                <div class="q-px-md q-py-sm">
                  <q-slider v-model="voteq1response" :min="voteq1RangeLower" :max="voteq1RangeUpper" :step="1"
                    marker-labels label :label-always="true" track-size="5px" thumb-size="28px" />
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
                            <input novalidate="true" v-model="voteq1response" tabindex="0"
                              id="f_6eee53df-da8d-4f65-9fad-d55fd4c1e7e7" type="number"
                              class="q-field__native q-placeholder text-center" />
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
                <p class="text-center text-negative q-mt-none q-mb-none"
                  v-if="validateRange(voteq1response, voteq1RangeLower, voteq1RangeUpper)">Issuance must be between
                  {{ voteq1RangeLower }} and {{ voteq1RangeUpper }}</p>
              </section>
            </article>

            <!--Mint Fee Vote-->
            <article>
              <div class="text-h5 bg-primary text-white q-px-lg q-py-md">Mint Fee</div>
              <div v-if="rewardsPrevious && rewardsPrevious['mint_fee_percent']" class="text-md bg-info q-px-lg q-py-md">
                Current Mint Fee: <strong>{{ parseFloat(rewardsPrevious['mint_fee_percent']) }}%</strong>
              </div>

              <section class="q-pa-lg">
                <p><strong>What percentage of the issuance should be minted this week?</strong></p>
                <p>The Mint Fee is required to mint Points into FREEOS, and may increase the demand for FREEOS tokens,
                  which can increase the price if the demand is strong—especially if the supply is also reduced.</p>



                <div class="q-px-md q-py-sm">
                  <q-slider v-model="voteq2response" :min="voteq2RangeLower" :max="voteq2RangeUpper" :step="1"
                    marker-labels label :label-always="!!voteq2response" track-size="5px" thumb-size="28px" />
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
                            <input novalidate="true" v-model="voteq2response" tabindex="0"
                              id="f_6eee53df-da8d-4f65-9fad-d55fd4c1e7e7" type="number"
                              class="q-field__native q-placeholder text-center" />
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
                <p class="text-center text-negative q-mt-none q-mb-none"
                  v-if="validateRange(voteq2response, voteq2RangeLower, voteq2RangeUpper)">Mint Fee must be between
                  {{ voteq2RangeLower }} and {{ voteq2RangeUpper }}</p>
              </section>
            </article>

            <!--Locking Threshold Vote-->
            <article>
              <div class="text-h5 bg-primary text-white q-px-lg q-py-md">Locking Threshold</div>
              <div class="text-md bg-info q-px-lg q-py-md">
                Current Locking Threshold: <strong>{{ targetPrice }} USD</strong>
              </div>

              <section class="q-pa-lg">
                <p><strong>What price should the Locking Threshold be this week?</strong></p>
                <p>The Mint Fee is required to mint Points into FREEOS, and may increase the demand for FREEOS tokens,
                  which can increase the price if the demand is strong—especially if the supply is also reduced.</p>



                <div class="q-px-md q-py-sm">
                  <q-slider required v-model="voteq3response" :min="voteq3RangeLower" :max="voteq3RangeUpper()"
                    :step="0.000001" marker-labels label :label-always="!!voteq3response" track-size="5px"
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
                            <input novalidate="true" v-model="voteq3response" tabindex="0"
                              id="f_6eee53df-da8d-4f65-9fad-d55fd4c1e7e7" type="number"
                              class="q-field__native q-placeholder text-center" />
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>
                <p class="text-center text-negative q-mt-none q-mb-none"
                  v-if="validateRange(voteq3response, voteq3RangeLower, voteq3RangeUpper())">Locking Threshold must be
                  between
                  {{ voteq3RangeLower }} and {{ voteq3RangeUpper() }}</p>
              </section>
            </article>

            <div class="q-pa-lg justify-center q-mb-sm">
              <q-btn size="lg" unelevated no-caps outline
                :disable="validateRange(voteq1response, voteq1RangeLower, voteq1RangeUpper) || validateRange(voteq2response, voteq2RangeLower, voteq2RangeUpper) || validateRange(voteq3response, voteq3RangeLower, voteq3RangeUpper())"
                color="primary" type="submit">
                Submit Vote</q-btn>
            </div>

          </q-card>
        </q-form>





        <!--SURVEY Completed-->
        <div v-if="surveyCompleted && surveyPeriodActive" class="panel-wrap">
          <q-card class="panel">
            <div class="text-h4 text-center q-ma-lg">Woohoo</div>
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

            <div class="text-subtitle2 text-primary text-center q-ma-md">Thanks for participating in this week's survey
            </div>
            <div class="bg-info text-h5 text-center q-py-md">Next: The Weekly Vote</div>
            <div class="bg-primary text-h5 text-center text-white q-py-md">Starts In <span
                v-html="$options.filters.secondsToDhms(voteStartsIn)"></span></div>


            <div class="bg-info text-subtitle2 text-center q-py-md q-px-lg">Completing the vote enables you to claim an
              additional
              {{ voteShare }}% of your weekly claim potential </div>
            <div class="text-h5 text-center q-ma-lg">See you soon for the VOTE</div>
          </q-card>
        </div>


        <!--THE SURVEY-->
        <q-form v-if="!surveyCompleted && surveyPeriodActive" ref="myForm" class="panel-wrap" @submit="submitSurvey()"
          @validation-error="onValidationError">
          <q-card class="panel">
            <div class="text-h4 text-center q-my-lg">Welcome to the Survey</div>
            <div class="bg-info text-md text-center q-py-md q-px-lg">Participate for {{ surveyShare }}% of your weekly
              Claim</div>

            <div class="bg-primary text-h5 text-center text-white q-py-md">Survey Closes in: <span
                v-html="$options.filters.secondsToDhms(surveyClosesIn)"></span></div>
            <p class="text-md text-center q-py-md q-px-md">Thank you for being part of FREEOS community who actively
              stewards this economy. Besides empowering your
              own financial freedom, your answers also affect the FREEOS community. The bonus is your participation is
              rewarded when you ‘Claim’. Initially, it may take some time to understand each economic tool - but
              that will change. For more info refer to:</p>
            <div class="bg-info text-h5 text-center q-py-md q-px-lg">Ready? Let’s start</div>
            <section>
              <div class="text-h5 bg-primary text-white q-px-lg q-py-md" style="line-height:1">
                Q1: Wider Crypto Economy Sentiment
              </div>

              <p class="text-lg q-py-md q-mb-none q-px-lg">Do you feel the Bitcoin (BTC) and wider crypto market is a
                growing (bull market), shrinking (bear market)
                or neither (going sideways)?</p>
              <div class="q-px-lg q-mb-lg">
                <q-field borderless ref="surveyq1response" :value="surveyq1response" lazy-rules
                  :rules="[val => val || 'Please Select an Option']">
                  <template v-slot:control>
                    <q-option-group required v-model="surveyq1response" :options="surveyq1options" />
                  </template>
                </q-field>
              </div>

            </section>
            <section>
              <div class="text-h5 bg-primary text-white q-px-lg q-py-md" style="line-height:1">
                Q2: Crypto Market Change of Direction
              </div>
              <p class="text-lg q-py-md q-mb-xs q-px-lg">How long will the above Bitcoin and crypto market last before
                it changes direction?</p>


              <div class="q-px-md q-py-sm">
                <q-slider v-model="surveyq2response" :min="surveythresholdRangeLower" :max="surveythresholdRangeUpper"
                  required :step="1" marker-labels label :label-always="!!surveyq2response" track-size="5px"
                  thumb-size="22px" />
              </div>
              <div class="panel q-pa-sm text-center q-mx-md q-mb-xl"><strong>{{ surveyq2response }} months</strong>
              </div>
            </section>
            <section>
              <div class="text-h5 bg-primary text-white q-px-lg q-py-md" style="line-height:1">Q3: FREEOS Economy
                Sentiment</div>

              <p class="text-lg q-py-md q-mb-none q-px-lg">Do you feel the Freeos economy is a growing (bull market),
                shrinking (bear market) or neither (going
                sideways)?</p>

              <div class="q-px-lg q-mb-lg">
                <q-field borderless ref="surveyq3response" :value="surveyq3response" lazy-rules
                  :rules="[val => val || 'Please Select an Option']">
                  <template v-slot:control>
                    <q-option-group required v-model="surveyq3response" :options="surveyq1options" />
                  </template>
                </q-field>
              </div>
            </section>
            <section>

              <div class="text-h5 bg-primary text-white q-px-lg q-py-md" style="line-height:1">Q4: FREEOS Change of
                Direction</div>

              <p class="text-lg q-py-md q-mb-xs q-px-lg">How long will the above Freeos market last before it changes
                direction?</p>
              <div class="q-px-md q-py-sm">
                <q-slider v-model="surveyq4response" :min="surveythresholdRangeLower" :max="surveythresholdRangeUpper"
                  required :step="1" marker-labels label :label-always="!!surveyq4response" track-size="5px"
                  thumb-size="22px" />
              </div>
              <div class="panel q-pa-sm text-center q-mx-md q-mb-xl"><strong>{{ surveyq4response }} months</strong>
              </div>
            </section>
            <section>

              <div class="text-h5 bg-primary text-white q-px-lg q-py-md" style="line-height:1">Q5: Priorities for Voting
              </div>



              <div class="q-px-lg">
                <p class="text-lg q-py-md q-ma-none">Select your top three priorities for this week's vote from the
                  following economic tools</p>

                <ul class="text-lg q-pb-sm q-mt-none">
                  <li>Growing the participants</li>
                  <li>Stabilising the price</li>
                  <li>Raising the Locking Threshold</li>
                </ul>

                <q-select lazy-rules :rules="[val => val || 'Please Select an Option']" required emit-value map-options
                  outlined v-model="surveyq5choice1" :options="surveyq5options1" label="Select Priority 1" />
                <q-select class="q-mt-sm" lazy-rules :rules="[val => val || 'Please Select an Option']" required
                  :disable="surveyq5choice1 === null" emit-value map-options outlined v-model="surveyq5choice2"
                  :options="surveyq5options2" label="Select Priority 2" />
                <q-select class="q-mt-sm q-mb-lg" lazy-rules :rules="[val => val || 'Please Select an Option']" required
                  :disable="surveyq5choice2 === null" emit-value map-options outlined v-model="surveyq5choice3"
                  :options="surveyq5options3" label="Select Priority 3" />

              </div>
            </section>

            <div style="align-items: center;" class="row justify-center q-mt-sm q-mb-lg q-px-lg">
              <q-btn size="lg" unelevated no-caps outline :disable="!surveyPeriodActive || surveyCompleted"
                color="primary" type="submit">
                Submit Survey</q-btn>
            </div>

          </q-card>
        </q-form>
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
  name: 'Vote',
  data() {
    return {
      termsCheckbox: false,
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
      surveyq1response: null,
      surveyq2response: null,
      surveyq3response: null,
      surveyq4response: null,
      surveyq5choice1: null,
      surveyq5choice2: null,
      surveyq5choice3: null,
      voteq1response: 0,
      voteq2response: 6,
      voteq3response: 0,
      lockingThresholdVote: 0,
      stakeCurrency: process.env.STAKING_CURRENCY,
      currencyName: process.env.CURRENCY_NAME,
      tokenCurrencyName: "XPR",//this.$options.filters.capitalize(process.env.TOKEN_CURRENCY_NAME),
      surveythresholdRangeLower: 1,
      surveythresholdRangeUpper: 24,
      voteq3RangeLower: parseFloat(process.env.VOTETHRESHOLDLOWER),
      voteWatcher: false,
      voteq1RangeLower: 0,
      voteq1RangeUpper: 100,
      voteq2RangeLower: 6,
      voteq2RangeUpper: 30,
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
      'ratifyStartsIn',
      'ratifyShare',
      'ratifyCompleted',
      'ratifyPeriodActive',
      'ratifyClosesIn',
      'lockFactor',
      'accountType',
      'isRegistered',
      'rewardsCurrent',
      'rewardsPrevious',
      'isVerified',
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
    this.surveyq2response = this.surveythresholdRangeUpper / 2;
    this.surveyq4response = this.surveythresholdRangeUpper / 2;
    this.voteq3response = (this.voteq3RangeUpper() + this.voteq3RangeLower) / 2;
  },
  methods: {
    ...mapActions('freeos', ['register', 'survey', 'vote', 'ratify']),
    validateRange(val, lower, upper) {
      try {
        val = parseFloat(val);
      } catch (err) {
        console.log(err);
        val = lower;
        return false
      }
      if (isNaN(val) || typeof val !== 'number' || val < lower || val > upper) {
        return true;
      } else {
        return false;
      }
    },
    voteq3RangeUpper() {
      return this.currentPrice < this.voteq3RangeLower ? Math.floor(parseFloat(this.lockFactor) * this.voteq3RangeLower * 10000000) / 10000000 : Math.floor(parseFloat(this.lockFactor) * this.currentPrice * 10000000) / 10000000;
    },
    async onValidationError(ref) {
      console.log('ref', ref.$refs.target);
      const el = ref.$refs.target;
      el.scrollIntoView();
    },
    async register() {
      var result = await this.register();
      console.log('registerResult', result)
      if (!(result instanceof Error)) {
        this.$refs.complete.openDialog({
          title: 'Woohoo!', subtitle: 'You have successfully Registered'
        });
      }
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
          title: "Woohoo!", subtitle: "Thanx for Submitting the Survey"
        });
      }
    },
    async submitVote() {
      const _ = this;
      console.log(this.surveyPeriodActive, this.surveyCompleted);

      var result = await _.vote({
        user: this.accountName,
        q1response: this.voteq1response,
        q2response: this.voteq2response,
        q3response: this.voteq3response,
        q4response: "POOL",
        q5response: 0,
        q6choice1: 1,
        q6choice2: 2,
        q6choice3: 3

      })
      if (!(result instanceof Error)) {
        this.$refs.complete.openDialog({
          title: "Woohoo!", subtitle: "Thanx for Voting"
        });
      }
    },
    async submitRatify(option) {
      const _ = this;
      console.log('submitRatify')
      var result = await _.ratify({
        user: this.accountName,
        ratify_vote: option
      })
      if (!(result instanceof Error)) {
        this.$refs.complete.openDialog({
          title: "Woohoo", subtitle: "Thanx for Ratifying"
        });
      }
    },
  }
}
</script>

<style>
.happy-stickman {
  margin: -3rem 0;
}

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
