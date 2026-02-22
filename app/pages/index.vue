<script setup lang="ts">
import Button from '~/components/buttons/Button.vue';
import TyperUtil from '~/utils/TyperUtil.vue';

const config = useAppConfig();
const { t } = useI18n();

useHead({
  title: `${t('pages.home')} - sleaf.dev`,
});
</script>

<template>
  <div class="wrapper">
    <div class="hero glass">
      <h1>{{ t('hero.title') }}</h1>
      <TyperUtil :words="config.typer" />
      <h3>{{ t('hero.text') }}</h3>
      <div class="hero__buttons">
        <Button
          :text="t('hero.mail')"
          :text-bold="true"
          text-color="#e9e9e9"
          borderRadius="0.5rem"
          :icon="config.icons.email"
          align="center"
          color="#b90091"
          :outline="false"
          :onClick="() => {}" />
        <Button
          :text="t('hero.discord')"
          :text-bold="false"
          text-color="#e9e9e9"
          borderRadius="0.5rem"
          :icon="config.icons.discord"
          align="center"
          color="#b90091"
          :outline="true"
          :onClick="() => {}" />
      </div>
      <div class="hero__links">
        <p class="text">{{ t('hero.follow') }}:</p>
        <a v-for="link in config.socialLinks" :key="link.icon" :href="link.url" target="_blank">
          <Icon :name="link.icon" class="icon" />
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/screens' as *;

.wrapper {
  display: flex;
  width: 100%;
  height: calc(100vh - 14rem);
  z-index: 10;
  justify-content: center;
  align-items: center;

  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem 5rem;
    gap: 0.3rem;

    &__links {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.4rem;

      .text {
        color: #d9d9d9;
        font-weight: bold !important;
      }

      .icon {
        font-size: 1.5rem;
        color: #e5e5e5;

        &:hover {
          color: rgb(0, 255, 178);
        }
      }
    }

    &__buttons {
      display: flex;
      flex-direction: row;
      align-items: center;
      padding: 1.3rem 0;
      gap: 0.5rem;
    }
  }
}
</style>
