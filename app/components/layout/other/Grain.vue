<script setup lang="ts"></script>

<template>
  <div class="grain" />
</template>

<style scoped lang="scss">
.grain {
  height: 100vh;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  height: 100%;
  width: 100%;
  mix-blend-mode: color-burn;
  pointer-events: none;
}

.grain:after {
  animation: grain 8s steps(10) infinite;
  background-image: url('/svg/noise.svg');
  content: '';
  height: 300%;
  width: 300%;
  left: -100%;
  top: -110%;
  opacity: 0.8;
  position: fixed;
}

@keyframes grain {
  0%,
  100% {
    transform: translate(0, 0);
  }
  10% {
    transform: translate(-5%, -10%);
  }
  20% {
    transform: translate(-15%, 5%);
  }
  30% {
    transform: translate(5%, -25%);
  }
  40% {
    transform: translate(-5%, 25%);
  }
  50% {
    transform: translate(-15%, 10%);
  }
  60% {
    transform: translate(15%, 0%);
  }
  70% {
    transform: translate(0%, 15%);
  }
  80% {
    transform: translate(5%, 35%);
  }
  90% {
    transform: translate(-10%, 10%);
  }
}
</style>
