<script setup lang="ts">
const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  textInvertedColor: {
    type: Boolean,
    default: false,
  },
  textBold: {
    type: Boolean,
    default: true,
  },
  customColor: {
    type: Boolean,
    default: true,
  },
  color: {
    type: String,
    default: '#50C878',
  },
  textColor: {
    type: String,
    default: 'white',
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
</script>

<template>
  <div class="button" :style="buttonStyle">
    <Icon name="codex:loader" class="button__img" :style="textStyle" />
    <p :style="textStyle">{{ props.text }}</p>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/screens' as *;

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
  animation: pulse 1.5s infinite;
  transition: background-color 0.3s, transform 0.2s, color 0.3s;

  &__img {
    font-size: 2rem;
  }
}

.button:hover {
  opacity: 0.8;
}

.button:active {
  transform: scale(0.95);
}
</style>
