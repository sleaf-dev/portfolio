<script setup lang="ts">
const config = useAppConfig();
const runtimeConfig = useRuntimeConfig();
const { t, locale } = useI18n();

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
  width: {
    type: String,
    default: '50%',
  },
});

const imageUrl = `${runtimeConfig.public.S3_URL}/${runtimeConfig.public.S3_BUCKET}/projects/images/${props.project.image}`;
const description = props.project.description[locale.value] || props.project.description['ru'];
</script>

<template>
  <div class="card">
    <div class="image">
      <NuxtImg class="image__img" fit="crop" height="22rem" width="1600" :src="imageUrl" loading="lazy" decoding="async" />
    </div>
    <div :class="`info ${width === '30%' ? 'info__small' : 'info__big'}`">
      <h4>{{ project.name }}</h4>
      <p class="info__description">{{ description }}</p>
    </div>
    <NuxtLink :to="project.url" class="active"></NuxtLink>
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

.active {
  display: flex;
  flex-direction: column;
  position: absolute;
  align-items: center;
  padding: 1rem;
  width: 100%;
  height: 100%;
  opacity: 0;
  filter: none !important;
  -webkit-filter: none !important;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 3px solid rgba(44, 32, 68, 0.073);
  border-top-right-radius: 2rem;
  border-bottom-right-radius: 2rem;
}
:hover {
  opacity: 100;
}

.info {
  display: flex;
  flex-direction: column;
  position: absolute;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 1rem;

  &__description {
    text-align: center;
    font-size: 1.4rem;
    font-family: 'Mori-SemiBold', 'Helvetica', 'Arial', sans-serif;
    font-variation-settings:
      'wght' 470,
      'ital' 0;
    color: #e3e3e3;
  }

  &__big {
    width: 18rem;
    height: 22rem;
    filter: none !important;
    -webkit-filter: none !important;
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 3px solid rgba(44, 32, 68, 0.073);
    border-top-right-radius: 2rem;
    border-bottom-right-radius: 2rem;
  }

  &__small {
    width: 92%;
    height: 7rem;
    bottom: 0;
    filter: none !important;
    -webkit-filter: none !important;
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border: 3px solid rgba(44, 32, 68, 0.073);
    border-top-left-radius: 2rem;
    border-top-right-radius: 2rem;
  }
}
</style>
