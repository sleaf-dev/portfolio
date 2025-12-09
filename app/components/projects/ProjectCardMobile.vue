<script setup lang="ts">
const config = useAppConfig();
const { t, locale } = useI18n();

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
});

console.log(props.project.image);

function getDescription(description: any): string {
  const currentLocale = locale.value;
  const localed = description[currentLocale];
  if (localed) {
    return localed;
  }
  return description['en'];
}
</script>

<template>
  <div class="card">
    <div class="image">
      <NuxtImg class="image__img" fit="crop" height="22rem" width="1600" :src="project.image" loading="lazy" decoding="async" placeholder />
    </div>
    <div class="info">
      <h4>{{ project.name }}</h4>
      <p class="info__description">{{ getDescription(project.description) }}</p>
    </div>
    <NuxtLink :to="project.url" class="active"></NuxtLink>
  </div>
</template>

<style scoped lang="scss">
@use '../../assets/scss/screens' as *;

.card {
  height: fit-content;
  display: flex;
  height: 18rem;
  width: 100%;
  flex-direction: row;
  overflow: hidden;
  position: relative;
  border-radius: 2rem;
}
:hover {
  box-shadow: 0 0 20px rgb(183, 0, 255), 0 0 40px rgb(200, 0, 255);
  transition: box-shadow 0.3s ease;
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
  height: 7rem;
  width: 90%;
  bottom: 0;
  filter: none !important;
  -webkit-filter: none !important;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  border: 3px solid rgba(44, 32, 68, 0.073);
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;

  &__description {
    text-align: center;
    font-size: 1.4rem;
    font-family: 'Mori-SemiBold', 'Helvetica', 'Arial', sans-serif;
    font-variation-settings: 'wght' 470, 'ital' 0;
    text-wrap: balance;
    color: #d1d1d1;
  }
}
</style>
