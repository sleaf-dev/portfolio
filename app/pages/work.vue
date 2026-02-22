<script setup lang="ts">
const { t } = useI18n();
useHead({
  title: `${t('pages.work')} - sleaf.dev`,
});
</script>
<template>
  <h4 style="width: 100%; text-align: center">{{ `Данная страница '${t('pages.work')}' находится сейчас в разработке...` }}</h4>
</template>

<style scoped lang="scss">
@use '@/assets/scss/screens' as *;

* {
  z-index: 100;
}
</style>
