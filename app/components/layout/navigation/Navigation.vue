<script setup lang="ts">
import NavItems from './NavItems.vue';
import UserInfo from './UserInfo.vue';

const config = useAppConfig();
const { status } = useAuth();
const links = computed((): any => {
  return [
    {
      label: 'nav.home',
      icon: config.icons.nav_home,
      vif: true,
      url: `/`,
    },
    {
      label: 'nav.projects',
      icon: config.icons.nav_projects,
      vif: true,
      url: `/projects`,
    },
    {
      label: 'nav.work',
      icon: config.icons.nav_work,
      vif: true,
      url: `/work`,
    },
  ];
});

const getUserClass = computed(() => {
  return status.value === 'authenticated' ? '' : 'glass';
});
</script>

<template>
  <nav>
    <div class="navigation-body">
      <div class="logo">
        <NuxtLink to="/" class="logo__link">
          <img class="logo__link__svg" src="/logo.svg" loading="lazy" decoding="async" />
        </NuxtLink>
      </div>
      <div class="buttons glass">
        <NavItems :links="links" />
      </div>
      <div :class="`user ${getUserClass}`">
        <UserInfo />
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
@use '@/assets/scss/screens' as *;

nav {
  display: flex;
  width: 100%;
  height: 7rem;
  z-index: 100;
  justify-content: center;
  align-items: center;

  .navigation-body {
    display: flex;
    flex-direction: row;
    width: 90%;
    height: 3.5rem;
    justify-content: space-between;
    align-items: center;
    gap: 0.7rem;

    .logo {
      display: flex;
      height: 100%;
      width: 10%;

      &__link {
        display: flex;
        appearance: none;
        align-items: center;
        height: 100%;
        width: 100%;

        &__svg {
          display: flex;
          height: 70%;
          width: 100%;
          z-index: 110;
        }
      }
    }

    .buttons {
      display: flex;
      height: 100%;
      width: fit-content;
      padding: 0 2rem;
      gap: 2rem;
    }

    .user {
      display: flex;
      height: 100%;
      width: 10%;
    }
  }
}
</style>
