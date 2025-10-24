<script setup lang="ts">
import config from "~/config/initial.config";
import FlexButton from "~/components/utilities/FlexButton.vue";
import iconsConfig from "~/config/icons.config";

const { t, locale } = useI18n()

onMounted(() => {
  useHead({
    title: t('donate_error') + " | " + config.siteName
  });
})

const getProjectsPath = computed(() => {
  return `/${locale.value}/`
})
</script>

<template>
  <ClientOnly>
    <div class="wrapper">
      <div class="card">
        <div class="blur__glass">
          <h6 class="card__title">
            {{ t('donate_error') }}
          </h6>
          <div class="card__bottom">
            <FlexButton :text="t('donate_button_home')"
                        :text-bold="true"
                        text-color="#f8f8f8"
                        :icon="iconsConfig.back_home"
                        color="#D30000"
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

  &__title {
    width: 100%;
    text-align: center;
    padding-bottom: 1rem;
    color: #2C2044;
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
