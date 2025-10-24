<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  text: {
    type: String,
    default: '',
  },
  textInvertedColor: {
    type: Boolean,
    default: false,
  },
  textBold: {
    type: Boolean,
    default: true,
  },
  icon: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#50C878',
  },
  textColor: {
    type: String,
    default: 'white',
  },
  click: {
    type: Promise<void>,
    default: () => {},
  },
  outline: {
    type: Boolean,
    default: false,
  },
});

const buttonStyle = computed(() => ({
  backgroundColor: props.outline ? 'transparent' : props.color,
  border: `2px solid ${props.color}`,
  color: props.outline ? props.color : 'white',
}));

const textStyle: any = computed(() => ({
  color: props.textInvertedColor ? 'white' : props.textColor,
  fontWeight: props.textBold ? 'bold' : 'normal',
  mixBlendMode: props.textInvertedColor ? 'difference' : 'none',
}));

async function runAction() {
  await props.click;
}
</script>

<template>
  <div @click="runAction()" class="button" :style="buttonStyle">
    <Icon :name="props.icon" class="button__img" :style="textStyle"></Icon>
    <p :style="textStyle" v-if="props.text.length > 0">{{ props.text }}</p>
  </div>
</template>

<style scoped lang="scss">
* {
  cursor: pointer;
  user-select: none;
}

.button {
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  text-decoration: none;
  border-radius: 2rem;
  transition: background-color 0.3s, transform 0.2s, color 0.3s;

  &__img {
    font-size: 1.5rem;
  }
}

.button:hover {
  opacity: 0.8;
}

.button:active {
  transform: scale(0.95);
}
</style>
