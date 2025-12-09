<script setup lang="ts">
import { KeepAlive } from 'vue';
import Navigation from '~/components/layout/navbar/Navigation.vue';
import Background from '~/components/layout/other/Background.vue';
import Grain from '~/components/layout/other/Grain.vue';
</script>

<template>
  <div id="body" class="body">
    <KeepAlive>
      <Suspense>
        <Navigation />
      </Suspense>
    </KeepAlive>
    <KeepAlive>
      <Grain />
    </KeepAlive>
    <ClientOnly>
      <KeepAlive>
        <Background />
      </KeepAlive>
    </ClientOnly>
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
