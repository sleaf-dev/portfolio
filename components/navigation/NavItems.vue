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
  color: #502da1 !important;
  font-weight: bold;
  border-bottom: 1px solid;
}

.dark .active {
  color: #fcf58d !important;
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
      color: #2c2044;

      &__label {
        @media screen and (max-width: $screen-md) {
          display: none;
        }
      }

      &__icon {
        width: 1.2rem;
        height: 1.2rem;

        @media screen and (max-width: $screen-md) {
          width: 1.6rem;
          height: 1.6rem;
        }

        @media screen and (max-width: $screen-sm) {
          width: 1rem;
          height: 1rem;
          padding: 0;
        }
      }
    }

    .dark &__default {
      color: #ffffff;
    }

    &__default:hover {
      color: #40267d;
      cursor: pointer;
    }

    .dark &__default:hover {
      color: #c6c071;
    }
  }
}
</style>
