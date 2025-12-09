<script setup lang="ts">
import type { NuxtError } from '#app';
import Background from './components/layout/other/Background.vue';
import Grain from './components/layout/other/Grain.vue';

const config = useAppConfig();
const { t } = useI18n();

defineProps({
  error: Object as () => NuxtError,
});
</script>

<template>
  <ClientOnly>
    <div class="wrapper">
      <Background />
      <Grain />
      <div class="error">
        <div class="error__text">
          <h1 class="error__text__title">{{ error?.statusCode }}</h1>
          <NuxtLink to="/" class="error__text__button error__text__button__text">
            <Icon :name="config.icons.back_home" />
            <h5 class="error__text__button__text">{{ t('home_button') }}</h5>
          </NuxtLink>
        </div>
        <div class="error__image">
          <NuxtImg class="error__image__img" :src="config.images.errorImg" loading="lazy" decoding="async" placeholder />
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  align-items: center;
}

.error {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  z-index: 5;

  &__image {
    display: flex;

    &__img {
      width: 30rem;
      height: 30rem;
    }
  }

  &__text {
    display: flex;
    flex-direction: column;
    align-items: end;
    width: 30rem;

    &__title {
      font-family: 'Mori-SemiBold', Helvetica, Arial, sans-serif;
      font-size: 10rem;
      font-style: normal;
      font-variation-settings: 'ital' 0, 'wght' 790;
      font-weight: bold;
      height: fit-content;
      text-shadow: 0.5rem 1rem 0rem #000000;
    }

    &__button {
      display: flex;
      flex-direction: row;
      width: 100%;
      text-decoration: none;
      justify-content: end;
      align-items: center;

      &__text {
        font-family: 'Mori-Regular', Helvetica, Arial, sans-serif;
        font-style: normal;
        font-variation-settings: 'ital' 0, 'wght' 790;
        font-weight: bold;
        font-size: 2rem;
        text-shadow: 0.15rem 0.15rem 0rem #000000;
        &:hover {
          color: rgb(0, 255, 178) !important;
        }
      }
    }
  }
}
</style>
