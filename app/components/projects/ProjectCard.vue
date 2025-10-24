<script setup lang="ts">
const config = useAppConfig();
const { t, locale } = useI18n();

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
  isSmall: {
    type: Boolean,
    defailt: false,
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
    <div :class="`card__info ${isSmall ? 'card__info__small' : 'card__info__big'}`"></div>
    <div class="card__image">
      <NuxtImg class="card__image__img" fit="contain" :src="project.image" loading="lazy" decoding="async" placeholder />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '../../assets/scss/screens' as *;

.card {
  height: fit-content;
  display: flex;
  height: 22rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 2px red solid;

  &__image {
    display: flex;
    width: 100%;
    height: auto;
    overflow: hidden;
    justify-content: center;
    align-items: center;

    &__img {
      width: 150%;
      height: auto;
    }
  }

  &__info {
    display: flex;
    position: absolute;
    background: white;

    &__big {
      width: 30rem;
      height: 22rem;
      rotate: 45deg;
    }

    &__small {
    }
  }
}
</style>
