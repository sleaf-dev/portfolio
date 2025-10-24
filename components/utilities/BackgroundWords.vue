<script setup lang="ts">
import { Vue3Marquee } from 'vue3-marquee';

const props = defineProps<{
  array: any;
}>();

const words = computed(() => {
  const array: string[] = [];
  props.array.forEach((element: any) => {
    if (element.loc !== undefined) {
      array.push(element.loc.source);
    } else if (element.b !== undefined) {
      array.push(element.b.s);
    }
  });
  return array;
});

const repeatRows = ref(4);

function calculateDirection(index: any): 'normal' | 'reverse' {
  return index % 2 === 0 ? 'reverse' : 'normal';
}

const resizeEvent = function () {
  const row = document.querySelector('.background__text__row');
  const screenHeight = window.innerHeight;
  const clientHeight = row?.clientHeight || 160;
  if (clientHeight > 0) {
    repeatRows.value = Math.ceil(screenHeight / clientHeight) - 1;
  }
};

onBeforeMount(async () => {
  window.addEventListener('resize', resizeEvent);
  nextTick(() => {
    resizeEvent();
  });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeEvent);
});
</script>

<template>
  <div class="background__blur">
    <div class="background__text">
      <div v-for="rowIndex in repeatRows" :key="'row-' + rowIndex" class="background__text__row">
        <Vue3Marquee :duration="100" clone :direction="calculateDirection(rowIndex)">
          <div class="background__text__word" v-for="word in words">
            {{ word }}
          </div>
        </Vue3Marquee>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use '/assets/scss/screens.scss' as *;

.background {
  &__blur {
    background-color: transparent;
    width: 100%;
    height: 100%;
    position: fixed;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    filter: blur(8px);
    -webkit-filter: blur(8px);
  }

  &__text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    font-size: 6rem;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    cursor: default;

    &__row {
      display: flex;
      justify-content: space-evenly;
      white-space: nowrap;
      width: 100%;
      word-spacing: 0.2rem;
    }

    &__word {
      font-size: 7.5rem;
      padding: 0 1.5rem;
      display: inline-flex;
      color: transparent !important;
      -webkit-text-stroke: 3px #b1b05f;

      @media screen and (max-width: $screen-lg) {
        font-size: 5rem;
      }
    }

    .dark &__word {
      -webkit-text-stroke: 2px #3d2a5a;
    }
  }
}
</style>
