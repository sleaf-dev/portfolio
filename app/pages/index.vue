<script setup lang="ts">
import axios from 'axios';
import Calendar from '~/components/gitlab/Calendar.vue';
import Separator from '~/components/utilities/Separator.vue';
import ProjectCard from '~/components/projects/ProjectCard.vue';

const { t } = useI18n();
const config = useAppConfig();

const projects = ref<any[]>([]);
const status = ref(false);

const templateCycle = [
  ['70%', '30%'],
  ['50%', '50%'],
  ['30%', '70%'],
];

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

const projectRows = computed(() => {
  const result = [];

  for (let i = 0; i < projects.value.length; i += 2) {
    const pair = projects.value.slice(i, i + 2);
    const rowIndex = Math.floor(i / 2);
    const template = templateCycle[rowIndex % templateCycle.length] ?? ['50%', '50%'];

    if (pair.length === 1) {
      result.push([{ project: pair[0], width: '100%' }]);
    } else {
      result.push([
        { project: pair[0], width: template[0] },
        { project: pair[1], width: template[1] },
      ]);
    }
  }

  return result;
});
</script>

<template>
  <div class="wrapper">
    <div class="hero">
      <section class="main-section">
        <div class="main-section__left">
          <NuxtImg class="main-section__left__img" :src="config.images.astronautImg" loading="lazy" decoding="async" placeholder />
        </div>
        <div class="main-section__right">
          <h1>{{ t('hero_title') }}</h1>
          <h4 class="main-section__right__text">
            {{ t('hero_text') }}
          </h4>
        </div>
      </section>
      <Separator />
      <div class="last-projects">
        <h1>{{ t('hero_projects') }}</h1>
        <div class="last-projects__container" v-if="status">
          <div v-for="(row, rowIndex) in projectRows" :key="'row-' + rowIndex" class="project-row">
            <div v-for="(item, colIndex) in row" :key="'project-' + rowIndex + '-' + colIndex" class="project-item" :style="{ width: item.width }">
              <ProjectCard :project="item.project" :isSmall="item.width === '30%'" />
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <div class="calendar">
        <h1>{{ t('hero_calendar') }}</h1>
        <div class="calendar__container">
          <Calendar class="calendar__container__component" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  z-index: 1;
  width: 100%;
  align-items: center;
}

.hero {
  display: flex;
  flex-direction: column;
  width: 80%;
  max-width: 80%;
  align-items: center;
  gap: 2rem;
}

.main-section {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 96vh;
  justify-content: center;

  &__left {
    display: flex;
    align-items: baseline;
    align-self: flex-end;

    &__img {
      width: 30rem;
      height: 30rem;
    }
  }

  &__right {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    align-self: flex-end;
    gap: 1rem;
    width: 50%;

    &__text {
      display: flex;
      height: fit-content;
      white-space: pre-line;
      width: 100%;
      text-wrap: balance;
      word-break: break-all;
    }
  }
}

.last-projects {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  height: fit-content;

  &__container {
    display: flex;
    width: 100%;
    height: fit-content;
  }

  .last-projects__container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .project-row {
    display: flex;
    width: 100%;
    gap: 1rem;
  }

  .project-item {
    transition: all 0.3s ease;
  }
}

.calendar {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;

  &__container {
    display: flex;
    width: 100%;
    justify-content: center;

    &__component {
      display: flex;
      width: 80%;
    }
  }
}
</style>
