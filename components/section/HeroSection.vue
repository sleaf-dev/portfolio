<script setup lang="ts">
import TyperUtil from "~/components/utilities/TyperUtil.vue";
import initialConfig from "~/config/initial.config";
import iconsConfig from "~/config/icons.config";
import toolsConfig from "~/config/tools.config";
import { Vue3Marquee } from "vue3-marquee";
import TechIcon from "~/components/utilities/TechIcon.vue";
import AnnouncementSection from "~/components/section/AnnouncementSection.vue";
import FlexButton from "~/components/utilities/FlexButton.vue";
const { t } = useI18n()
const theme = useColorMode();
</script>

<template>
  <div class="displayed">
    <div id="hero" class="wrapper blur__glass">
      <div class="main">
        <div class="main__content">
          <h6 class="main__content__hey">{{ t("main_hey") }}</h6>
          <div class="main__content__title">
            <h1 class="main__content__title__first">{{ t("main_title") }}</h1>
            <h1 class="main__content__title__second">{{ initialConfig.nickname }}</h1>
          </div>
          <Suspense>
            <TyperUtil class="type-writer" :words="initialConfig.main_typer" />
            <template #fallback>
              <div class="skeleton-typer"/>
            </template>
          </Suspense>
          <label class="main__content__spell">{{ t("main_spell") }}</label>
          <div class="stack">
            <div class="stack__background">
              <Suspense>
                <Vue3Marquee pause-on-hover :duration="60" class="stack__background__text">
                  <div class="stack__text" v-for="tool in toolsConfig.tools" :key="tool">
                    <Suspense>
                      <TechIcon class="data-marquee-icon" :icon="tool" />
                      <template #fallback>
                        <div class="skeleton-icon" />
                      </template>
                    </Suspense>
                    <p>{{ tool }}</p>
                  </div>
                </Vue3Marquee>
                <template #fallback>
                  <div class="skeleton-marquee"/>
                </template>
              </Suspense>
            </div>
          </div>
          <p class="main__content__social">
            {{ t("main_follow") }}
            <a class="main__content__social__icons">
              <a v-for="link in initialConfig.socialLinks" :key="link.icon" :href="link.url">
                <Icon :name="link.icon" class="main__content__social__icons__icon"/>
              </a>
            </a>
          </p>
          <div class="main__content__buttons">
            <FlexButton :text="t('main_email')"
                        :text-bold="true"
                        :text-color="theme.value === 'dark' ? '#3d3a48' : '#ffffff'"
                        :icon="iconsConfig.email"
                        :color="theme.value === 'dark' ? '#fff02b' : '#351479'"
                        link="mailto:me@sleaf.dev"
                        class="main__content__button__btn"
                        :outline="false" />
            <FlexButton :text="t('main_discord')"
                        :text-bold="false"
                        :text-color="theme.value === 'dark' ? '#ffffff' : '#2C2044'"
                        :icon="iconsConfig.discord"
                        :color="theme.value === 'dark' ? '#fff02b' : '#351479'"
                        link="https://discord.com/users/SolsticeLeaf"
                        class="main__content__button__btn"
                        :outline="true" />
          </div>
        </div>
      </div>
      <div class="image">
        <div class="image__content">
          <Suspense>
            <nuxt-img
                id="hero-avatar"
                :src="initialConfig.hero.avatar_url"
                alt="SolsticeLeaf"
                fit="cover"
                height="80%"
                loading="eager"
            />
            <template #fallback>
              <div class="skeleton-avatar"/>
            </template>
          </Suspense>
        </div>
      </div>
    </div>
    <div class="announcements">
      <Suspense>
        <AnnouncementSection />
        <template #fallback>
          <div class="skeleton-announcement"/>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "../../assets/scss/screens" as *;

.wrapper {
  @media screen and (max-width: $screen-sm) {
    width: 90%;
  }
  @media screen and (max-width: $screen-xs) {
    width: 100%;
  }
}

.blur__glass {
  @media screen and (max-width: $screen-sm) {
    background: transparent;
  }
}

.displayed {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  height: 80vh;
  max-height: 85vh;
  justify-content: center;

  @media screen and (max-width: $screen-xs) {
    height: fit-content;
    max-height: fit-content;
    width: 95%;
  }
}

.announcements {
  display: flex;
  width: 100vw;
}

.main {
  display: flex;
  width: fit-content;
  align-content: center;
  max-height: 100% !important;

  @media screen and (max-width: $screen-md) {
    height: 100%;
    width: 100%;
  }

  &__content {
    margin-left: auto;
    margin-right: 0;
    width: fit-content;
    height: 100%;
    align-content: center;

    @media screen and (max-width: $screen-md) {
      height: 100%;
      width: 100%;
      align-items: center;
      align-content: center;
      justify-content: center;
    }

    &__title {
      display: flex;
      flex-direction: row;
      align-items: center;
      gap: 1rem;

      &__second {
        color: #4b00d7;
        font-weight: bold;
      }

      .dark &__second {
        color: #DFC7FF;
      }

      @media screen and (max-width: $screen-md) {
        justify-content: center;
      }
    }

    &__social {
      display: flex;
      flex-direction: row;
      gap: 0.5rem;

      &__icons {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
        max-height: 100%;
        vertical-align: middle;

        &__icon {
          color: #2C2044;
          font-size: 1.7rem;
        }:hover { color: #6a6f7e; }

        .dark &__icon {
          color: #ffffff;
        }
      }

      @media screen and (max-width: $screen-md) {
        justify-content: center;
      }
    }

    &__buttons {
      display: flex;
      flex-direction: row;
      margin-top: 1rem;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      gap: 0.5rem;

      &__btn {
        max-height: 2rem;

        @media screen and (max-width: $screen-md) {
          max-height: 3rem;
          height: 3rem;
          width: 9rem;
          align-items: center;
          align-content: center;
          justify-content: center;
          margin: 0.2rem;
        }

        @media screen and (max-width: $screen-sm) {
          max-width: fit-content;
        }
      }

      .button {
        @media screen and (max-width: $screen-xss) {
          height: 3rem;
        }
      }

      @media screen and (max-width: $screen-md) {
        margin-top: 1rem;
        display: flex;
        width: 100%;
        align-items: center;
        align-content: center;
        justify-content: center;
      }

      @media screen and (max-width: $screen-sm) {
        margin-top: 1rem;
      }
    }

    .type-writer {
      max-height: 100%;
      color: #29183F;
      font-style: italic;

      .Typist .Cursor {
        color: #4b2a75;
      }

      .dark .Typist .Cursor {
        color: #FCF58D;
      }
    }

    .dark .type-writer {
      color: #BFA8E0;
    }
  }
}

.image {
  display: flex;
  width: fit-content;
  height: inherit;

  &__content {
    height: 100%;
    width: 30rem;
    text-align: center;
    align-items: center;
    margin-left: 0;
    margin-right: auto;
    display: flex;

    @media screen and (max-width: $screen-lg) {
      width: 25rem;
    }

    @media screen and (max-width: $screen-md) {
      width: 12rem;
    }

    @media screen and (max-width: $screen-sm) {
      width: 8rem;
    }
  }

  .image__content > img {
    border-radius: 25%;
    max-height: 100%;
    max-width: 100%;
    flex-shrink: 1;
    flex-basis: auto;

    @media screen and (max-width: $screen-md) {
      display: block;
    }
  }

  @media screen and (max-width: $screen-md) {
    display: grid;
    height: 100%;
    width: 100%;
    align-items: center;
    align-content: center;
    justify-content: center;
    margin-bottom: 1rem;
  }
}

.stack {
  text-align: center;
  align-items: center;
  width: 100%;

  @media screen and (max-width: $screen-md) {
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    width: 100%;
  }

  @media screen and (max-width: $screen-sm) {
    padding: 1.5rem 0;
    height: 2.5rem;
  }

  &__background {
    display: flex;
    max-width: 25rem;
    max-height: 2.5rem;
    border-radius: 2rem;
    background: -webkit-linear-gradient(0deg, #A782FF 15%, #9d78ce 60%, #482a7e 100%);
    margin-top: 1rem;
    margin-bottom: 1rem;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    vertical-align: middle;
    justify-content: center;

    &__text {
      border-radius: 2rem;

      &__icon {
        padding-right: 0.5rem;
        height: 1.5rem;
      }

      @media screen and (max-width: $screen-sm) {
        height: 100%;
      }
    }

    @media screen and (max-width: $screen-md) {
      max-width: 20rem;
      margin-top: 0.8rem;
      margin-bottom: 0.8rem;
      border-radius: 2em;
    }

    @media screen and (max-width: $screen-sm) {
      padding: 0.3rem 0;
    }
  }

  .dark &__background {
    background: -webkit-linear-gradient(0deg, #f6ef9d 15%, #f6ef8b 60%, #e3c17d 100%);
  }

  &__text {
    display: flex;
    flex-direction: row;
    height: 100%;
    max-height: 100%;
    padding: 0 1rem;
    font-weight: bold;
    color: #fffde7;
    align-items: center;

    @media screen and (max-width: $screen-md) {
      padding: 0 2rem;
    }

    &__icon {
      padding-right: 0.2rem;
      height: 1.3rem;

      @media screen and (max-width: $screen-md) {
        height: 1rem;
      }
    }
  }

  .dark &__text {
    color: #3d3a48;
  }
}

.skeleton-typer {
  width: 100%;
  height: 2rem;
  background: #e0e0e0;
  animation: pulse 1.5s infinite;
}

.skeleton-marquee {
  width: 25rem;
  height: 2rem;
  background: #e0e0e0;
  animation: pulse 1.5s infinite;
}

.skeleton-icon {
  width: 1.5rem;
  height: 1.5rem;
  background: #e0e0e0;
  animation: pulse 1.5s infinite;
  margin-right: 0.5rem;
}

.skeleton-avatar {
  width: 30rem;
  height: 80%;
  background: #e0e0e0;
  border-radius: 25%;
  animation: pulse 1.5s infinite;
}

.skeleton-announcement {
  width: 100%;
  height: 10rem;
  background: #e0e0e0;
  animation: pulse 1.5s infinite;
}
</style>
