<script setup lang="ts">
const runtimeConfig = useRuntimeConfig();
const { t, locale } = useI18n();

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

const s3Url = `${runtimeConfig.public.S3_URL}/${runtimeConfig.public.S3_BUCKET}/projects`;
const iconUrl = `${s3Url}/icons/${props.project.icon}`;
const imageUrl = `${s3Url}/images/${props.project.image}`;
const description = props.project.description[locale.value] || props.project.description['ru'];
</script>

<template>
  <div class="card">
    <div class="image">
      <NuxtImg class="image__img" fit="crop" height="22rem" width="1600" :src="imageUrl" loading="lazy" decoding="async" />
    </div>
    <NuxtLink class="info" :to="project.url" target="_blank">
      <h4 class="info__title">
        <NuxtImg class="info__icon" :src="iconUrl" loading="lazy" decoding="async" />
        {{ project.name }}
      </h4>
      <p class="info__description">{{ description }}</p>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
@use '../../assets/scss/screens' as *;

.card {
  height: fit-content;
  display: flex;
  height: 22rem;
  flex-direction: row;
  overflow: hidden;
  position: relative;
  border-radius: 2rem;
}

.image {
  display: flex;
  width: 100%;
  height: auto;
  overflow: hidden;
  justify-content: center;
  align-items: center;
}

.info {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 100%;
  height: 100%;
  filter: none !important;
  -webkit-filter: none !important;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  text-decoration: none;
  bottom: 0;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  &:hover {
    transition: all 1s ease;
    backdrop-filter: blur(0);
    -webkit-backdrop-filter: blur(0);
  }

  &__title {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.2rem;
  }

  &__icon {
    display: flex;
    width: 2rem;
  }

  &__description {
    max-width: 80%;
    text-align: center;
    font-size: 1.4rem;
    font-family: 'Mori-SemiBold', 'Helvetica', 'Arial', sans-serif;
    font-variation-settings:
      'wght' 470,
      'ital' 0;
    color: #e3e3e3;
  }
}
</style>
