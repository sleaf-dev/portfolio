<script setup lang="ts">
import Background from '~/components/layout/other/Background.vue';
import Grain from '~/components/layout/other/Grain.vue';
import Navigation from '~/components/layout/navigation/Navigation.vue';
</script>

<template>
  <div id="body" class="body">
    <Grain />
    <KeepAlive>
      <Background />
    </KeepAlive>
    <KeepAlive>
      <Navigation />
    </KeepAlive>
    <Suspense>
      <slot />
    </Suspense>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/screens' as *;

.body {
  display: flex;
  flex-direction: column;
}
</style>
