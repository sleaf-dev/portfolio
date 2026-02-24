<script setup lang="ts">
import Button from '~/components/buttons/Button.vue';
import UserMenu from './UserMenu.vue';
import { onClickOutside } from '@vueuse/core';

const { status, signIn } = useAuth();
const { t } = useI18n();
const config = useAppConfig();
const isNotificationOpened = ref(false);
const isUserMenuOpened = ref(false);
const notificationRef = ref<HTMLElement>();
const userMenuRef = ref<HTMLElement>();

onClickOutside(notificationRef, () => {
  isNotificationOpened.value = false;
});

onClickOutside(userMenuRef, () => {
  isUserMenuOpened.value = false;
});
</script>

<template>
  <Button
    v-if="status === 'unauthenticated'"
    class="login"
    :text="t('buttons.login_through')"
    text-color="#e9e9e9"
    borderRadius="0.5rem"
    :isGlass="true"
    :iconLeft="false"
    :icon="config.icons.github"
    color="transparent"
    :onClick="
      () => {
        signIn('github');
      }
    " />
  <div class="user-info" v-else>
    <UserMenu />
  </div>
</template>

<style scoped lang="scss">
@use '/assets/scss/screens.scss' as *;

.login {
  width: 100%;
  transition: all 1s ease;
  opacity: 0;
}
:hover {
  transition: all 1s ease;
  opacity: 100;
}

.user-info {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
}
</style>
