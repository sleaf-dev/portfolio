<script setup lang="ts">
import Button from '~/components/buttons/Button.vue';
import { onClickOutside } from '@vueuse/core';

const { data, signOut } = useAuth();
const { t } = useI18n();
const config = useAppConfig();
const isUserMenuOpened = ref(false);
const userMenuRef = ref<HTMLElement>();

onClickOutside(userMenuRef, () => {
  isUserMenuOpened.value = false;
});
</script>

<template>
  <div ref="userMenuRef" class="dropdown-wrapper">
    <div class="user-info__manage glass" :class="{ active: isUserMenuOpened }" @click="isUserMenuOpened = !isUserMenuOpened">
      <NuxtImg v-if="data?.user?.image" :src="data?.user?.image || ''" class="user-info__manage__image" loading="lazy" decoding="async" placeholder />
      <Icon v-else :name="config.icons.avatar" class="user-info__manage__image" />
    </div>
    <Transition name="dropdown">
      <div v-show="isUserMenuOpened" class="dropdown-menu glass dropdown-menu--user">
        <div class="dropdown-menu__user-header">
          <NuxtImg v-if="data?.user?.image" :src="data?.user?.image || ''" class="user-avatar" />
          <Icon v-else :name="config.icons.avatar" class="user-avatar" />
          <div class="user-details">
            <p class="user-name">{{ data?.user?.name || t('user_menu.user') }}</p>
            <label class="user-email">{{ data?.user?.email || t('user_menu.email') }}</label>
          </div>
        </div>
        <div class="dropdown-menu__divider" />
        <div class="dropdown-menu__footer button">
          <Button
            :text="t('buttons.exit')"
            class="menu-button"
            text-color="#e9e9e9"
            borderRadius="0.5rem"
            :icon="config.icons.exit"
            align="start"
            color="transparent"
            :onClick="
              () => {
                signOut();
              }
            " />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
@use '@/assets/scss/screens' as *;

.dropdown-wrapper {
  position: relative;
}

.user-info__manage {
  display: flex;
  background: transparent;
  border-radius: 1rem;
  height: 3rem;
  width: 3rem;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 1.3rem;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover,
  &.active {
    border: 1px solid rgb(0, 255, 178);
  }
}

.user-info__manage {
  overflow: hidden;

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 1rem;
  }
}

.dropdown-menu {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  border-radius: 0.75rem;
  min-width: 280px;
  box-shadow: 0 10px 40px rgba(54, 54, 54, 0.5);
  z-index: 1000;
  overflow: hidden;

  &--user {
    right: -1rem;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #ffffff;
    font-size: 0.875rem;
    color: #999;
  }

  &__link {
    appearance: none;
    text-decoration: none;
  }

  &__user-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem;

    .user-avatar {
      width: 2.8rem;
      height: 2.8rem;
      border-radius: 50%;
      object-fit: cover;
      color: #ffffff;
    }

    .user-details {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;

      .user-name {
        color: #e9e9e9;
        font-weight: 600;
        font-size: 1.3rem;
      }
    }
  }

  &__content {
    max-height: 300px;
    overflow-y: auto;
  }

  &__items {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
  }

  &__divider {
    height: 1px;
    background: rgba(255, 255, 255, 0.194);
    margin: 0 0.5rem;
  }

  &__footer {
    padding: 0.5rem;
  }
}

.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
