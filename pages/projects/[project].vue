<script setup lang="ts">
import config from '@/config/initial.config';
import TechIcon from '~/components/utilities/TechIcon.vue';
import iconsConfig from '~/config/icons.config';
import { Vue3Marquee } from 'vue3-marquee';
import FlexButton from '~/components/utilities/FlexButton.vue';
import LoadingButton from '~/components/utilities/LoadingButton.vue';

const { t, locale } = useI18n();
const theme = useColorMode();
const route = useRoute();

const { data: project, status: status } = useFetch('/api/projects/getProjectData', {
  key: 'projects',
  query: {
    id: route.params.project,
  },
  default: () => {},
  cache: 'no-cache',
  server: false,
  onResponse: (response) => {
    const item = response.response._data;
    if (item != null) {
      useHead({
        title: item.title + ' | ' + config.siteName,
        meta: [
          {
            name: 'description',
            content: getDescription(item.description),
          },
        ],
      });
    } else {
      useHead({ title: 'ERROR | ' + config.siteName });
    }
  },
});

const downloadData = ref();
const isDownloadReady = computed(() => !!downloadData.value);

const isPending = computed(() => {
  return status.value === 'pending';
});
const isSuccess = computed(() => {
  return status.value === 'success' && project.value.title != null;
});

watchEffect(async () => {
  if (isSuccess.value) {
    try {
      downloadData.value = await $fetch('/api/projects/getDownloadData', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        default: () => {},
        body: JSON.stringify({ link: project.value.downloadLink }),
        cache: 'no-cache',
        server: false,
      });
    } catch (error) {
      console.error('Ошибка загрузки данных:', error);
    }
  }
});

const getProjectsPath = computed(() => {
  return `/${locale.value}/projects`;
});

function getDescription(description: any): string {
  const localed = description[locale.value];
  if (localed) {
    return localed;
  }
  return description['en'];
}

function getButtonName(name: any): string {
  const localed = name[locale.value];
  if (localed) {
    return localed;
  }
  return name['en'];
}

function hasDownloadLink() {
  return project.value.downloadLink.length > 0;
}
</script>

<template>
  <ClientOnly>
    <div v-if="!isSuccess" class="blur__glass">
      <div v-if="isPending" class="projects__message">
        <Icon name="codex:loader" class="loading-indicator" />
      </div>
      <div v-else class="projects__message">
        <h1>
          {{ t('notFound') }}
        </h1>
      </div>
    </div>
    <div v-else class="wrapper">
      <div class="screen-sm">
        <div class="blur__glass info__buttons">
          <FlexButton
            v-for="source in project.sources"
            :key="source.name"
            :text="getButtonName(source.name)"
            :text-bold="true"
            text-color="#f8f8f8"
            :icon="source.icon"
            :color="source.color"
            :link="source.link"
            class="info__buttons__btn"
            :outline="false" />
          <div v-if="hasDownloadLink()">
            <FlexButton
              v-if="isDownloadReady"
              :text="t('download_button') + (downloadData?.data?.version || '')"
              :text-bold="true"
              text-color="#f8f8f8"
              :icon="iconsConfig.download"
              color="#50C878"
              :link="downloadData?.data?.downloadLink || project.downloadLink"
              class="info__buttons__btn"
              :outline="false" />
            <LoadingButton
              v-else
              :text="t('download_button')"
              :text-bold="true"
              text-color="#f8f8f8"
              color="#50C878"
              class="info__buttons__btn"
              :outline="false" />
          </div>
          <FlexButton
            :text="t('back_button')"
            :text-bold="true"
            text-color="#f8f8f8"
            :icon="iconsConfig.back_home"
            color="#D30000"
            :link="getProjectsPath"
            class="info__buttons__btn"
            :outline="false" />
        </div>
      </div>
      <div class="content blur__glass">
        <div class="desktop">
          <KeepAlive>
            <FlexButton
              :text="t('project_back_button')"
              :text-bold="true"
              text-color="#c74600"
              :icon="iconsConfig.back_home"
              color="transparent"
              :link="getProjectsPath"
              class="back-button"
              :outline="false" />
          </KeepAlive>
        </div>
        <h1 class="content__title">{{ project.title }}</h1>
        <p class="content__description">{{ getDescription(project.description) }}</p>
      </div>
      <div class="info blur__glass">
        <Suspense>
          <nuxt-img fit="cover" class="info__logo" :src="project.imageLink" />
          <template #fallback>
            <div class="skeleton-image" />
          </template>
        </Suspense>
        <div class="info__container">
          <div class="info__marquee transparent__glass">
            <Suspense>
              <Vue3Marquee pause-on-hover clone :duration="30" class="info__marquee__container">
                <div class="info__marquee__container__item" v-for="lang in project.languages" :key="lang.name">
                  <Suspense>
                    <TechIcon class="data-marquee-icon" :icon="lang.icon" />
                    <template #fallback>
                      <div class="skeleton-icon" />
                    </template>
                  </Suspense>
                  <p>{{ lang.name }}</p>
                </div>
              </Vue3Marquee>
              <template #fallback>
                <div class="skeleton-marquee" />
              </template>
            </Suspense>
          </div>
          <div class="info__marquee tech__background">
            <Suspense>
              <Vue3Marquee direction="reverse" pause-on-hover clone :duration="30" class="info__marquee__container">
                <div class="info__marquee__container__item" v-for="tech in project.techs" :key="tech.name">
                  <Suspense>
                    <TechIcon class="data-marquee-icon" :icon="tech.icon" />
                    <template #fallback>
                      <div class="skeleton-icon" />
                    </template>
                  </Suspense>
                  <p>{{ tech.name }}</p>
                </div>
              </Vue3Marquee>
              <template #fallback>
                <div class="skeleton-marquee" />
              </template>
            </Suspense>
          </div>
          <div class="desktop-md">
            <div class="info__buttons">
              <FlexButton
                v-for="source in project.sources"
                :key="source.name"
                :text="getButtonName(source.name)"
                :text-bold="true"
                text-color="#f8f8f8"
                :icon="source.icon"
                :color="source.color"
                :link="source.link"
                class="info__buttons__btn"
                :outline="false" />
              <div v-if="hasDownloadLink()">
                <FlexButton
                  v-if="isDownloadReady"
                  :text="t('download_button') + (downloadData?.data?.version || '')"
                  :text-bold="true"
                  text-color="#f8f8f8"
                  :icon="iconsConfig.download"
                  color="#50C878"
                  :link="downloadData?.data?.downloadLink || project.downloadLink"
                  class="info__buttons__btn"
                  :outline="false" />
                <LoadingButton
                  v-else
                  :text="t('download_button')"
                  :text-bold="true"
                  text-color="#f8f8f8"
                  color="#50C878"
                  class="info__buttons__btn"
                  :outline="false" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="md-back-button">
        <KeepAlive>
          <FlexButton
            :text="t('project_back_button')"
            :text-bold="true"
            :text-color="theme.value === 'dark' ? '#ffffff' : '#2C2044'"
            :icon="iconsConfig.back_home"
            color="transparent"
            :link="getProjectsPath"
            class="back-button"
            :outline="false" />
        </KeepAlive>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
@use '../../assets/scss/screens' as *;

.wrapper {
  width: 60%;
  height: 100%;
  display: flex;
  padding-bottom: 1rem;
  gap: 1rem;

  @media screen and (max-width: $screen-lg) {
    width: 80%;
  }

  @media screen and (max-width: $screen-md) {
    width: 95%;
  }
}

.desktop-md {
  width: 100%;
}

.blur__glass {
  @media screen and (max-width: $screen-md) {
    background: transparent;
  }
}

.md-back-button {
  display: none;
  filter: none !important;
  -webkit-filter: none !important;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 3rem;
  border: 1px solid rgba(44, 32, 68, 0.2);
  background: transparent;
  padding: 0.5rem 1rem;
  width: fit-content;

  @media screen and (max-width: $screen-md) {
    display: flex;
  }

  @media screen and (max-width: $screen-sm) {
    display: none;
  }
}

.dark .md-back-button {
  border: 1px solid rgba(210, 210, 210, 0.2);
}

::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 7px;
}

::-webkit-scrollbar-thumb {
  border-radius: 3rem;
  background-color: rgba(100, 100, 100, 0.5);
  box-shadow: 0 0 1px rgba(255, 255, 255, 0.2);
}

.back-button {
  width: fit-content;
  padding: 0;
}

.content {
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 70%;

  @media screen and (max-width: $screen-md) {
    width: auto;
  }

  &__title {
    background: -webkit-linear-gradient(0deg, #a782ff 15%, #9872cb 60%, #4a2e7c 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .dark &__title {
    background: -webkit-linear-gradient(0deg, #f6ef9d 15%, #f6ef8b 60%, #e3c17d 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &__description {
    white-space: pre-line;
  }
}

.tech__background {
  filter: none !important;
  -webkit-filter: none !important;
  border-radius: 3rem;
  border: 1px solid rgba(44, 32, 68, 0.2);
  background: -webkit-linear-gradient(0deg, #a782ff 15%, #8c67be 60%, #4f3383 100%);
  color: #fffde7;
  font-weight: bold;
}

.dark .tech__background {
  filter: none !important;
  -webkit-filter: none !important;
  border-radius: 3rem;
  border: 1px solid rgba(210, 210, 210, 0.2);
  background: -webkit-linear-gradient(0deg, #f6ef9d 15%, #f6ef8b 60%, #e3c17d 100%);
  color: #3d3a48;
  font-weight: bold;
}

.info {
  display: flex;
  flex-direction: column;
  width: 30%;
  height: fit-content;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  @media screen and (max-width: $screen-md) {
    width: auto;
    flex-direction: row;
    justify-content: space-evenly;
    gap: 0;
  }

  @media screen and (max-width: $screen-sm) {
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
  }

  &__container {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;

    @media screen and (max-width: $screen-md) {
      width: 50%;
    }

    @media screen and (max-width: $screen-sm) {
      width: 100%;
    }
  }

  &__logo {
    width: auto;
    max-width: 100%;
    height: 15rem;
    padding-bottom: 1rem;
  }

  &__marquee {
    display: flex;
    flex-direction: row;
    border-radius: 3rem;
    height: 1rem;
    width: 100%;
    overflow-x: scroll;
    scrollbar-width: none;
    overflow-y: hidden;
    justify-content: center;
    justify-items: center;
    align-items: center;
    align-content: center;
    text-align: center;
    column-gap: 1rem;
    padding: 1rem 0;

    &__container {
      display: flex;
      flex-direction: row;

      &__item {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        align-content: center;
        text-align: center;
        border-radius: 3rem;
      }
    }
  }

  &__buttons {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: fit-content;
    gap: 0.5rem;
    filter: none !important;
    -webkit-filter: none !important;
    border-radius: 2rem;
    border: 1px solid rgba(44, 32, 68, 0.2);
    background: rgba(44, 32, 68, 0.05);
    padding: 1rem;

    @media screen and (max-width: $screen-md) {
      background: transparent;
    }

    &__btn {
      @media screen and (max-width: $screen-sm) {
        height: 2.5rem;
      }
    }
  }

  .dark &__buttons {
    border: 1px solid rgba(210, 210, 210, 0.2);
    background: rgba(143, 143, 143, 0.1);
  }
}

.skeleton-image {
  width: 100%;
  height: 10rem;
  background: #e0e0e0;
  animation: pulse 1.5s infinite;
}

.skeleton-marquee {
  width: 100%;
  height: 2.8rem;
  background: #e0e0e0;
  animation: pulse 1.5s infinite;
}

.skeleton-icon {
  width: 1.5rem;
  height: 1.5rem;
  background: #e0e0e0;
  animation: pulse 1.5s infinite;
}
</style>
