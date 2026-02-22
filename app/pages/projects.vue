<script setup lang="ts">
import ProjectCard from '~/components/projects/ProjectCard.vue';
const { t } = useI18n();

useHead({
  title: `${t('pages.projects')} - sleaf.dev`,
});

const { data: projects } = await useFetch<any[]>('/api/v1/projects/get', {
  default: () => [],
});

const templateCycle = [
  ['70%', '30%'],
  ['50%', '50%'],
  ['30%', '70%'],
  ['50%', '50%'],
];

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
    <div class="projects">
      <div v-for="(row, rowIndex) in projectRows" :key="'row-' + rowIndex" class="row">
        <div v-for="(item, colIndex) in row" :key="'project-' + rowIndex + '-' + colIndex" class="item glass" :style="{ width: item.width }">
          <ProjectCard :project="item.project" :width="item.width" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/screens' as *;

.wrapper {
  display: flex;
  width: 100%;
  z-index: 10;
  justify-content: center;
  align-items: center;
  padding-bottom: 7rem;

  .projects {
    display: flex;
    flex-direction: column;
    width: 60%;
    gap: 1rem;
    height: fit-content;

    .row {
      display: flex;
      width: 100%;
      gap: 1rem;
    }

    .item {
      height: fit-content;
      display: flex;
      height: 22rem;
      max-width: 100rem;
      flex-direction: row;
      overflow: hidden;
      position: relative;
      border-radius: 2rem;

      transition: all 0.3s ease;
    }
  }
}
</style>
