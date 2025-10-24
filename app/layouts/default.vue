<script setup lang="ts">
import { KeepAlive } from 'vue';
import Navigation from '~/components/layout/navbar/Navigation.vue';
import Background from '~/components/layout/other/Background.vue';
import Grain from '~/components/layout/other/Grain.vue';
import Footer from '~/components/layout/Footer.vue';
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
    <ClientOnly>
      <Suspense>
        <Footer />
      </Suspense>
    </ClientOnly>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/screens' as *;

.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  width: 100vw;
  max-width: 100vw;
  height: 100vw;
  max-height: fit-content;
}
</style>
