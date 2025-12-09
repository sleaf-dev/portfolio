<script setup lang="ts">
import Logo from '~~/public/logo.svg?component';
import NavItems from './NavItems.vue';

const config = useAppConfig();
const { locale, locales, setLocale } = useI18n();

const selectedLanguage = ref<any>(
  locales.value.filter((loc: any) => {
    return loc.code === locale.value;
  })[0] || locales.value[0]
);

const homePath = computed(() => {
  return `/${locale.value}`;
});

const links = computed((): any => {
  const currentLocale = locale.value;
  return [
    {
      label: 'nav_home',
      icon: config.icons.nav_home,
      postfix: '',
      vif: true,
      type: 'path',
      action: `/${currentLocale}`,
    },
    {
      label: 'nav_projects',
      icon: config.icons.nav_projects,
      postfix: '',
      vif: true,
      type: 'path',
      action: `/projects`,
    },
  ];
});
</script>

<template>
  <nav>
    <Suspense>
      <NuxtLink :to="homePath" class="logo">
        <Logo class="logo__name" />
      </NuxtLink>
    </Suspense>
    <div class="main-body">
      <div class="wrapper glass">
        <Suspense>
          <KeepAlive>
            <NavItems :links="links" />
          </KeepAlive>
        </Suspense>
      </div>
    </div>
    <div class="locale-body">
      <div class="locale">
        <Suspense>
          <div class="locale__selector glass">
            <Icon :name="config.icons.nav_lang" class="locale__selector__select__icon" />
            <select class="locale__selector__select" v-model="selectedLanguage" @change="setLocale(selectedLanguage.code)">
              <option v-for="locale in locales" :value="locale">
                {{ locale.name }}
              </option>
            </select>
          </div>
        </Suspense>
      </div>
    </div>
  </nav>
</template>

<style scoped lang="scss">
@use '/assets/scss/screens.scss' as *;

nav {
  display: flex;
  flex-direction: row;
  vertical-align: middle;
  width: 100%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  align-items: center;
  padding: 1.5rem 0;
  z-index: 100;
  position: absolute;
  height: 4.5rem;
  top: 0;
  z-index: 15;

  @media screen and (max-width: $screen-sm) {
    justify-content: center;
    align-items: center;
  }

  .logo {
    width: fit-content;
    height: 100%;
    width: 20%;
    display: inline-flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-weight: bold;
    text-decoration: none;

    @media screen and (max-width: $screen-sm) {
      display: none;
    }

    &__name {
      height: 100%;
      fill: #ffffff;
      transition: fill 0.4s ease;

      &:hover {
        fill: rgb(0, 255, 178) !important;
      }
    }
  }

  .main-body {
    display: flex;
    height: 100%;
    justify-content: center;
    width: 60% !important;
  }

  .wrapper {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    gap: 1.2rem;
    width: fit-content;
  }

  .locale-body {
    display: flex;
    justify-content: center;
    width: 20%;
    height: 100%;

    @media screen and (max-width: $screen-sm) {
      display: none;
    }
  }

  .locale {
    display: flex;

    &__selector {
      display: flex;
      text-decoration: none;
      padding: 0 1rem;
      align-items: center;
      justify-content: center;
      gap: 0.2rem;

      &__select {
        display: inline-block;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background: none;
        border: none;
        color: #ffffff;
        height: 70%;
        text-align-last: center;

        &:focus {
          outline: none;
        }

        &:hover {
          color: rgb(0, 255, 178);
          cursor: pointer;
        }

        &__icon {
          color: #ffffff;
          width: 1.5rem;
          height: 1.5rem;
        }
      }
    }
  }
}
</style>
