<script setup lang="ts">
import Waves from '@@/public/waves.svg?component';

const config = useAppConfig();
const { t } = useI18n();

const year = new Date().getFullYear();
</script>

<template>
  <footer>
    <Waves class="waves" />
    <div class="footer">
      <div class="text">
        <p>{{ `Copyright © ${year} by SolsticeLeaf.` }}</p>
        <NuxtLink class="text__mail" :href="`mailto:${config.data.mail}`">
          <Icon :name="config.icons.email" class="text__mail__icon" />
          <p class="text__mail__text">{{ config.data.mail }}</p>
        </NuxtLink>
        <p class="null">{{ `${t('welcome')}, /dev/null™` }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="scss">
@use '@/assets/scss/screens' as *;

footer {
  width: 100%;
  height: fit-content;
  z-index: 0;
}

.waves {
  width: 100%;
  display: flex;
  z-index: 1;
  margin-bottom: -8%;

  @media screen and (max-width: $screen-sm) {
    margin-bottom: -1%;
  }
}

.footer {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  overflow-x: hidden;
  padding-bottom: 5rem;
  background: #ffffff;

  .text {
    display: flex;
    flex-direction: column;
    padding: 0 6rem;
    width: 100%;
    z-index: 2;
    align-items: start;
    justify-content: center;
    gap: 1rem;

    @media screen and (max-width: $screen-sm) {
      padding: 0 1rem;
    }

    &__mail {
      display: flex;
      flex-direction: row;
      gap: 0.2rem;
      text-decoration: none;

      &__text {
        color: #ff00e6 !important;
        font-family: 'Mori-Regular', Helvetica, Arial, sans-serif;
        font-size: 1.5rem;
        font-style: normal;
        font-variation-settings: 'ital' 0, 'wght' 790;
        font-weight: bold;

        @media screen and (max-width: $screen-sm) {
          font-size: 1rem !important;
        }
      }

      &__icon {
        color: #ff00e6;
        width: 1.5rem;
        height: 1.5rem;

        @media screen and (max-width: $screen-sm) {
          width: 1rem;
          height: 1rem;
        }
      }

      &:hover {
        cursor: pointer;
      }
    }

    p {
      font-family: 'Mori-Regular', Helvetica, Arial, sans-serif;
      font-size: 1.5rem;
      font-style: normal;
      font-variation-settings: 'ital' 0, 'wght' 790;
      font-weight: bold;
      color: #2e2e2e;

      @media screen and (max-width: $screen-sm) {
        font-size: 1rem !important;
      }
    }

    .null {
      color: #636363;
      font-weight: 400;
    }
  }
}
</style>
