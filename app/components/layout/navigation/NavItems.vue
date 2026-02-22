<script setup lang="ts">
interface Link {
  label: string;
  postfix: string;
  icon: string;
  vif: boolean;
  url: string;
}

const { t } = useI18n();
const route = useRoute();
defineProps<{
  links: Link[];
}>();

function isActive(path: string): boolean {
  return route.path === path;
}
</script>

<template>
  <div v-for="link in links" :key="link.url" class="links" :style="link.vif ? '' : 'display: none'">
    <NuxtLink :to="link.url" class="link">
      <h5 v-if="link.label" :class="`deactive ${isActive(link.url) ? 'active' : ''}`">
        <Icon :name="link.icon" />
        {{ t(link.label) }}
      </h5>
      <h5 v-if="link.postfix" class="deactive">
        {{ link.postfix }}
      </h5>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
@use '/assets/scss/screens.scss' as *;

.links {
  height: 100%;
  justify-content: space-evenly;
  width: fit-content;

  .link {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 0.2rem;
    height: 100%;
    text-decoration: none;
    font-size: 1.5rem;
    color: #ffffff;

    .deactive {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 0.2rem;
      border-bottom: 3px transparent solid;

      &:hover {
        color: rgb(0, 255, 178) !important;
        transform: scale(1.08);
        cursor: pointer;
      }
    }

    .active {
      border-bottom: 3px rgb(255, 123, 245) solid !important;
      font-weight: bold;

      &:hover {
        color: rgb(255, 123, 245) !important;
        cursor: pointer;
      }
    }
  }
}
</style>
