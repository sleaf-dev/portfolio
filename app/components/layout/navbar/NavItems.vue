<script setup lang="ts">
interface Link {
  label: string;
  icon: string;
  postfix: string;
  vif: boolean;
  type: string;
  action: any;
}

const { t, locale } = useI18n();
const route = useRoute();
defineProps<{
  links: Link[];
}>();

function isActive(path: string): boolean {
  const currentLocale = locale.value;
  const currentPath = route.path.replace(/\/\s*$/, '');
  if (path === `/${currentLocale}`) {
    return currentPath === path;
  } else {
    return currentPath.includes(path);
  }
}
</script>

<template>
  <div v-for="link in links" :key="link.icon" class="nav__links" :style="link.vif ? '' : 'display: none'">
    <NuxtLink v-if="link.type === 'path'" :to="link.action" :class="`nav__links__default ${isActive(link.action) ? 'active' : ''}`">
      <Icon :name="link.icon" class="nav__links__default__icon" />
      <p v-if="link.label" class="nav__links__default__label">
        {{ t(link.label) }}
      </p>
      <p v-if="link.postfix" class="nav__links__default__label">
        {{ link.postfix }}
      </p>
    </NuxtLink>
    <div v-else class="nav__links__default" @click="link.action">
      <Icon :name="link.icon" class="nav__links__default__icon" />
      <p v-if="link.label" class="relative nav__links__default__label">
        {{ t(link.label) }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '/assets/scss/screens.scss' as *;

.active {
  color: rgb(0, 255, 178) !important;
  font-weight: bold;
  padding-bottom: 0.5rem;
  border-bottom: 3px rgb(255, 123, 245) solid;
}

.nav {
  width: fit-content;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  gap: 1.2rem;

  &__links {
    height: 60%;

    &__default {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      gap: 0.2rem;
      height: 100%;
      text-decoration: none;
      color: #ffffff;

      &__icon {
        width: 1.5rem;
        height: 1.5rem;
      }
    }

    &__default:hover {
      color: rgb(0, 255, 178);
      padding-bottom: 0.5rem;
      border-bottom: 3px solid;
      cursor: pointer;
    }
  }
}
</style>
