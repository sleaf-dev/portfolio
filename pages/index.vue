<script setup lang="ts">
import HeroSection from "~/components/section/HeroSection.vue";
</script>

<template>
  <ClientOnly>
    <KeepAlive>
      <HeroSection/>
    </KeepAlive>
  </ClientOnly>
</template>

<style scoped lang="scss">
</style>
