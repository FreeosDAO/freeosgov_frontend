<template>
    <div class="text-center q-pa-lg loading-wrap">
        <div class="freeos-loading q-mt-lg"><div></div><div></div><div></div><div></div></div>
        <div class="text-h5">
                Loading your account...
        </div>
    </div>
</template>

<script>
export default {
    name: 'Loading'
}
</script>

<style>
.loading-wrap{
    max-width: 300px;
    margin: 0 auto;
    border-radius: 1rem;
}
.freeos-loading {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.freeos-loading div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 64px;
  height: 64px;
  margin: 8px;
  border: 8px solid var(--q-color-primary);
  border-radius: 50%;
  animation: freeos-loading 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: var(--q-color-primary) transparent transparent transparent;
}
.freeos-loading div:nth-child(1) {
  animation-delay: -0.45s;
}
.freeos-loading div:nth-child(2) {
  animation-delay: -0.3s;
}
.freeos-loading div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes freeos-loading {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>