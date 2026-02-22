<script setup lang="ts">
let ticking = false;

const handleScroll = async () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const background = document.querySelector('.background') as HTMLElement;
      const video = document.querySelector('.background__video') as HTMLElement;
      const overlap = document.querySelector('.overlap') as HTMLElement;

      let scrollY = window.scrollY;
      let u = 2.65;
      let i = 0.03;
      (scrollY < 0 && ((u = 1), (i = 0)),
        (video.style.transform = `translateY(${((scrollY <= 0 ? 0 : scrollY) / u) * -1}px)`),
        (overlap.style.transform = `translateY(${((scrollY <= 0 ? 0 : scrollY) / u) * -1}px)`),
        (background.style.filter = `blur(${Math.min(100, scrollY * i)}px)`));
      ticking = false;
    });
    ticking = true;
  }
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<template>
  <div class="background">
    <NuxtImg src="/media/background.webp" class="background__photo" loading="lazy" decoding="async" />
    <video class="background__video" preload="auto" autoplay loop muted playsinline>
      <source src="/media/background.webm" type="video/webm" />
      <source src="/media/background.mp4" type="video/mp4" />
    </video>
    <div class="overlap" />
  </div>
</template>

<style scoped lang="scss">
@use '/assets/scss/screens.scss' as *;

.background {
  display: flex;
  position: fixed;
  width: 100%;
  top: -4rem;
  left: 0;

  @media screen and (max-width: $screen-phone) {
    top: 0rem;
    left: -30rem;
    width: 400%;
  }
}

.background__photo {
  position: fixed;
  z-index: -3;
  width: 100%;
}

.background__video {
  z-index: -2;
  width: 100%;
}

.overlap {
  filter: blur(80px);
  background-color: #6b50ff;
  width: 200vw;
  height: 25vw;
  position: absolute;
  z-index: 0;
  top: 70vh;

  @media screen and (max-width: $screen-phone) {
    top: 80vh;
  }
}
</style>
