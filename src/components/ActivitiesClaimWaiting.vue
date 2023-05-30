<template>
  <div>
    <svg v-if="!eligibleToClaim" class="happy-stickman" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
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
    <div v-if="eligibleToClaim">
      <div class="text-h5 text-center q-mt-lg q-mb-sm">You have a 'CLAIM' waiting</div>
      <div class="row justify-center q-mb-lg">
        <div class="col-3 col-grow text-right">
          <svg style="width: 100px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
              viewBox="0 0 81.4 140.7" enable-background="new 0 0 81.4 140.7" xml:space="preserve">
            <g id="Ellipse_1" transform="translate(3.028)">
              <circle fill="#FFFFFF" cx="34" cy="25.6" r="14"/>
              <circle fill="none" stroke="#4DA1DE" stroke-width="4" cx="34" cy="25.6" r="12"/>
            </g>
            <path id="Path_40" fill="none" stroke="#369DE8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" d="M31.8,79.2
              L22,60.4l18.7-14.4l29.6,4.3l-16,10v9.2"/>
            <g id="Ellipse_22" transform="translate(33.469 45)">
              <ellipse fill="#FFFFFF" cx="23.5" cy="13.6" rx="3.5" ry="2"/>
              <ellipse fill="none" stroke="#369DE8" cx="23.5" cy="13.6" rx="3" ry="1.5"/>
            </g>
            <path id="Path_41" fill="none" stroke="#369DE8" stroke-width="4" stroke-linecap="round" d="M39.3,39.6l6.9,42.8"/>
            <path id="Path_42" fill="none" stroke="#369DE8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" d="M45.9,83.7
              c-10.8,10.6-2.2,40.8-2.2,40.8l-5.9,2.8"/>
            <path id="Path_43" fill="none" stroke="#369DE8" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" d="M65.6,127.4
              l-6.1-4.1c0,0,2.8-31.3-13.7-41.7"/>
            <path id="Path_44" fill="none" stroke="#369DE8" d="M34.5,31.7c0,0,6.3,0.6,8.7-2.2"/>
          </svg>
        </div>
        <div class="col-md-4 col-grow row justify-center content-center">
          <router-link :to="`/claim`" class="go-to-claim text-center text-white bg-primary q-ma-auto">
            <div class="q-mb-none">Go to the</div>
            <div class="text-h5 text-bold text-uppercase" style="line-height: 1.1">Claim<br>Page</div>
          </router-link>
        </div>
        <div class="col-3 col-grow text-right"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ActivitiesClaimWaiting',
  computed: {
    ...mapGetters('freeos', [
      'eligibleToClaim'
    ])
  }
}
</script>

<style>
.happy-stickman {
  margin: -4rem 0;
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

.go-to-claim {
    width: 140px;
    height: 140px;
    border-radius: 100em;
    display: flex !important;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    flex-direction: column;
    position: relative;
    transition: all ease 0.2s;
}
.go-to-claim:before{
    width: 90%;
    height: 90%;
    content: "";
    position: absolute;
    top: 50%; left: 50%;
    translate: -50% -50%;
    border: 1px solid white;
    border-radius: 100em;
}
.go-to-claim:hover{
  box-shadow: 0 0 20px rgb(0 0 0 / 25%)
}
</style>