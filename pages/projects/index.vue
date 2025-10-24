<script setup lang="ts">
import ProjectCard from '~/components/card/ProjectCard.vue';
import config from '~/config/initial.config';
const { t } = useI18n();

const { data: projects, status: status } = useFetch('/api/projects/getProjectsData', {
  key: 'projects',
  default: () => [],
  cache: 'no-cache',
  server: false,
});

onMounted(() => {
  useHead({
    title: t('nav_projects') + ' | ' + config.siteName,
  });
});

const hasProjects = computed(() => {
  const items = projects.value;
  return items !== null && items.length > 0;
});

const isPending = computed(() => {
  return status.value === 'pending';
});

const getSortedProjects = computed(() => {
  const items = projects.value;
  if (!hasProjects) return [];
  items.sort((a: any, b: any) => a.title.localeCompare(b.title));
  return items;
});
</script>

<template>
  <ClientOnly>
    <div v-if="!hasProjects" class="blur__glass">
      <div v-if="isPending" class="projects__message">
        <Icon name="codex:loader" class="loading-indicator" />
      </div>
      <div v-else class="projects__message">
        <h1>
          {{ t('empty') }}
        </h1>
      </div>
    </div>
    <div v-else class="wrapper">
      <div class="projects">
        <div class="projects">
          <div class="projects__card" v-for="item in getSortedProjects" :key="item.title">
            <Suspense>
              <ProjectCard v-bind:id="item._id" :title="item.title" :description="item.description" :image-link="item.imageLink" />
              <template #fallback>
                <div class="skeleton-card" />
              </template>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
@use 'assets/scss/screens' as *;

.blur__glass {
  @media screen and (max-width: $screen-sm) {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border-radius: 0;
    border: transparent;
    background: transparent;
  }
}

.wrapper {
  flex-direction: column;
  box-sizing: border-box;
  height: fit-content;
  overflow-y: visible;
  align-items: center;
  padding: 0;
}

.projects {
  height: fit-content;
  justify-content: center;
  display: grid;
  display: -moz-grid;
  display: -ms-grid;
  grid-gap: 1rem;
  grid-auto-rows: auto;
  grid-template-columns: 22rem 22rem 22rem 22rem;
  padding-bottom: 0.5rem;
  width: fit-content;

  @media screen and (max-width: $screen-lg) {
    grid-template-columns: 20rem 20rem 20rem;
  }

  @media screen and (max-width: $screen-md) {
    grid-template-columns: 20rem 20rem;
  }

  @media screen and (max-width: $screen-sm) {
    grid-template-columns: 95%;
  }

  &__message {
    font-weight: bold;
    padding: 1rem;
  }
}

.skeleton-progress {
  width: 14rem;
  height: 1rem;
  background: #e0e0e0;
  animation: pulse 1.5s infinite;
}

.skeleton-card {
  width: 100%;
  height: 20rem;
  background: #e0e0e0;
  animation: pulse 1.5s infinite;
}
</style>
