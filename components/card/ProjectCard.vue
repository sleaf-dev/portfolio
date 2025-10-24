<script setup lang="ts">
import FlexButton from "~/components/utilities/FlexButton.vue";
import iconsConfig from "~/config/icons.config";

const { t, locale } = useI18n()

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: Object,
    required: true
  },
  imageLink: {
    type: String,
    required: true
  }
});

function getImageUrl(path: string): string {
  return new URL(path, import.meta.url).href
}

function getDescription(description: any): string {
  const currentLocale = locale.value;
  const localed = description[currentLocale]
  if (localed) {
    return localed
  }
  return description["en"]
}
</script>

<template>
  <ClientOnly>
    <div class="card blur__glass">
      <div class="card__image">
        <nuxt-img loading="lazy" class="card__image__content" :src="getImageUrl(imageLink)"/>
      </div>
      <div class="card__info">
        <div class="card__info__title">
          <h6 class="card__info__title__text">{{ title }}</h6>
        </div>
        <div class="card__info__description">
          <p class="card__info__description__text">{{ getDescription(description) }}</p>
        </div>
      </div>
      <div class="card__button">
        <FlexButton :text="t('read_more')"
                    :text-bold="true"
                    text-color="#f8f8f8"
                    :icon="iconsConfig.read_more"
                    color="#008080"
                    :link="`/projects/${props.id}`"
                    class="main__content__button__btn"
                    :outline="false" />
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
@use '../../assets/scss/screens' as *;

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 7px;
}

::-webkit-scrollbar-thumb {
  border-radius: 3rem;
  background-color: rgba(100, 100, 100, 0.5);
  box-shadow: 0 0 1px rgba(255, 255, 255, .2);
}

.blur__glass {
  padding: 0;
  background: transparent;
  border-radius: 1rem;
}

.card {
  height: fit-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 0;

  &__image {
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    justify-items: center;
    width: 100%;
    height: 8rem;

    &__content {
      max-width: 100%;
      max-height: 100%;

      @media screen and (max-width: $screen-sm) {
        height: inherit;
      }
    }
  }

  &__info {
    display: flex;
    flex-direction: column;
    height: fit-content;
    width: 90%;

    &__title {
      display: block;
      height: fit-content;
      word-wrap: break-word;
      max-height: 35%;
      width: 100%;
      text-align: center;

      &__text {
        overflow: hidden;
        background: -webkit-linear-gradient(0deg, #A782FF 15%, #9872cb 60%, #4a2e7c 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      .dark &__text {
        overflow: hidden;
        background: -webkit-linear-gradient(0deg, #f6ef9d 15%, #f6ef8b 60%, #e3c17d 100%);
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    }

    &__description {
      display: block;
      height: 65%;
      text-align: center;
      max-height: 65%;
      width: 100%;

      @media screen and (max-width: $screen-sm) {
        height: fit-content;
      }

      &__text {
        max-height: 100%;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        line-clamp: 3;
        -webkit-line-clamp: 3;

        @media screen and (max-width: $screen-md) {
          line-clamp: 4;
          -webkit-line-clamp: 4;
        }

        @media screen and (max-width: $screen-sm) {
          -webkit-box-orient: vertical;
          overflow-y: hidden;
          line-clamp: 3;
          -webkit-line-clamp: 3;
        }
      }
    }
  }

  &__button {
    display: flex;
    flex-direction: column;
    padding-top: 0.5rem;
    width: 90%;

    .button {
      padding: 0.2rem;

      @media screen and (max-width: $screen-sm) {
        padding: 0.5rem;
      }
    }
  }
}

</style>
