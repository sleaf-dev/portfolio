<script>
import { techIcons } from '@/assets/additions/techIcons.addition';

export default {
  name: 'TechIcon',
  props: {
    icon: String,
  },
  computed: {
    iconUrl() {
      return techIcons[this.icon];
    },
  },
};
</script>

<template>
  <nuxt-img class="icon" :src="iconUrl" alt="" />
</template>

<style scoped lang="scss">
.icon {
  max-height: 100%;
  max-width: 100%;
}
</style>
