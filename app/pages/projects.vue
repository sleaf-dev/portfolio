<script setup lang="ts">
import axios from 'axios';
import ProjectCard from '~/components/projects/ProjectCard.vue';
import ProjectCardMobile from '~/components/projects/ProjectCardMobile.vue';
import NavSeparator from '~/components/layout/navbar/NavSeparator.vue';
import Footer from '~/components/layout/Footer.vue';

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
  <KeepAlive>
    <ClientOnly>
      <NavSeparator />
      <div class="wrapper">
        <div class="hero">
          <div class="projects">
            <div class="projects__container" v-if="status">
              <div v-for="(row, rowIndex) in projectRows" :key="'row-' + rowIndex" class="project-row">
                <div v-for="(item, colIndex) in row" :key="'project-' + rowIndex + '-' + colIndex" class="project-item" :style="{ width: item.width }">
                  <ProjectCard :project="item.project" :isSmall="item.width === '30%'" />
                </div>
              </div>
            </div>
          </div>
          <div class="projects-mobile">
            <div class="projects-mobile__container" v-if="status">
              <div class="projects-mobile__container" v-for="project in projects" :key="project.url">
                <ProjectCardMobile :project="project" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </ClientOnly>
  </KeepAlive>
</template>

<style scoped lang="scss">
@use '@/assets/scss/screens' as *;

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

.projects {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  height: fit-content;

  @media screen and (max-width: $screen-md) {
    height: 70vh;
  }

  @media screen and (max-width: $screen-sm) {
    display: none;
  }

  .projects__container {
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

.projects-mobile {
  display: none;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
  height: fit-content;

  @media screen and (max-width: $screen-sm) {
    display: flex;
  }

  .projects-mobile__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 1rem;
  }
}
</style>
