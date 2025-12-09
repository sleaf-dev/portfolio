<script setup lang="ts">
import axios from 'axios';
import FlexButton from '~/components/buttons/FlexButton.vue';
import TyperUtil from '~/components/utilities/TyperUtil.vue';

const { t } = useI18n();
const config = useAppConfig();

const projects = ref<any[]>([]);
const status = ref(false);

onBeforeMount(async () => {
  await axios
    .post('/api/projects/getProjects', {
      amount: 4,
    })
    .then((response) => {
      projects.value = response.data.projects || [];
    })
    .catch((error) => {
      console.log(error);
      projects.value = [];
    })
    .finally(() => {
      status.value = true;
    });
});
</script>

<template>
  <div class="wrapper">
    <div class="hero">
      <div class="hero__left glass">
        <h1>{{ config.data.nickname }}</h1>
        <TyperUtil :words="config.typer" />
        <h4>{{ t('hero_text') }}</h4>
        <div class="hero__left__links">
          <p class="hero__left__links__text">{{ t('hero_follow') }}:</p>
          <a v-for="link in config.socialLinks" :key="link.icon" :href="link.url">
            <Icon :name="link.icon" class="hero__left__links__icon" />
          </a>
        </div>
        <div class="hero__left__buttons">
          <FlexButton
            :text="t('hero_mail')"
            :text-bold="true"
            text-color="#ffffff"
            :icon="config.icons.email"
            color="#b90091"
            :link="config.data.mailLink"
            class="main__content__button__btn"
            :outline="false" />
          <FlexButton
            :text="t('discord')"
            :text-bold="false"
            text-color="#e9e9e9"
            :icon="config.icons.discord"
            color="#b90091"
            :link="config.data.discordLink"
            class="main__content__button__btn"
            :outline="true" />
        </div>
      </div>
      <div class="hero__right glass">
        <NuxtImg
          class="hero__right__image"
          fit="crop"
          height="22rem"
          width="1600"
          :src="config.images.astronautImg"
          loading="lazy"
          decoding="async"
          placeholder />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/screens' as *;

.wrapper {
  display: flex;
  flex-direction: column;
  z-index: 1;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
}

.hero {
  display: flex;
  flex-direction: row;
  width: 70%;
  height: 50%;
  justify-content: space-evenly;

  @media screen and (max-width: $screen-lg) {
    height: 60%;
    width: 90%;
  }

  @media screen and (max-width: $screen-md) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media screen and (max-width: $screen-sm) {
    height: 100%;
    flex-direction: column;
    justify-content: end;
    margin-bottom: 2rem;
  }

  &__left {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    height: 100%;
    width: 40%;

    @media screen and (max-width: $screen-md) {
      width: 80%;
    }

    @media screen and (max-width: $screen-sm) {
      width: 100%;
      height: 35%;
    }

    &__links {
      align-items: center;
      display: flex;
      gap: 0.2rem;

      &__text {
        font-size: 1.4rem;
        font-family: 'Mori-SemiBold', 'Helvetica', 'Arial', sans-serif;
        font-variation-settings: 'wght' 470, 'ital' 0;
        margin: 0;
        color: #e1e1e1;
      }

      &__icon {
        font-size: 1.7rem;
        color: #e1e1e1;
      }
      :hover {
        color: #9d2dbb;
      }
    }

    &__buttons {
      display: flex;
      flex-direction: row;
      gap: 1rem;
    }
  }

  &__right {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 40%;

    @media screen and (max-width: $screen-sm) {
      display: none;
    }

    &__image {
      width: 80%;
    }
  }
}
</style>
