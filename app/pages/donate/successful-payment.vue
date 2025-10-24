<script setup lang="ts">
import FlexButton from '~/components/buttons/FlexButton.vue';

const config = useAppConfig();
const { t, locale } = useI18n();

onMounted(() => {
  useHead({
    title: t('donate_success'),
  });
});

const getProjectsPath = computed(() => {
  return `/${locale.value}/`;
});
</script>

<template>
  <ClientOnly>
    <div class="wrapper">
      <div class="card">
        <div class="card__top">
          <Icon class="card__top__image" :name="config.icons.donate_success" />
        </div>
        <div class="blur__glass">
          <h6 class="card__title">
            {{ t('donate_success') }}
          </h6>
          <div class="card__bottom">
            <FlexButton
              :text="t('donate_button_home')"
              :text-bold="true"
              text-color="#252525"
              :icon="config.icons.back_home"
              color="#50C878"
              :link="getProjectsPath"
              class="card__bottom__button"
              :outline="false" />
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
@use 'assets/scss/screens' as *;

.wrapper {
  display: flex;
  flex-direction: column;
  height: 80vh;
  justify-content: center;

  @media screen and (max-width: $screen-sm) {
    padding: 1rem;
  }
}

.donate-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 300px;
  margin: auto;
}

.card {
  display: flex;
  flex-direction: column;

  &__top {
    display: grid;
    justify-items: center;
    align-items: center;
    padding-bottom: 3rem;

    &__image {
      font-size: 10rem;
      color: red;
    }
  }

  &__title {
    width: 100%;
    text-align: center;
    padding-bottom: 1rem;
    color: #2c2044;
  }

  .dark &__title {
    color: #ffffff;
  }

  &__bottom {
    display: flex;
    width: 100%;
    justify-content: center;
    justify-items: center;

    &__button {
      width: 100%;
      height: 2.5rem;
    }
  }
}
</style>
