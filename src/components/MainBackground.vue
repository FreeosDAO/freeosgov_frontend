<template>
    <div class="static-bg"></div>
</template>

<script>
    export default {
        name: 'MainBackground'
    }
</script>

<style>
    .static-bg {
    width: 100%;
    height: 100%;
  background-image: url('../assets/bluebg.svg');
  background-size: 130vw;
  background-position: center 25vh;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>