<script setup lang="ts">
import axios from 'axios';
import ActionButton from '~/components/buttons/ActionButton.vue';

const config = useAppConfig();
const { t, locale } = useI18n();

onMounted(() => {
  useHead({
    title: t('donate_title'),
  });
});

function getDefaultCurrency(list: any) {
  let defaultCurrency = list[0];
  if (locale.value === 'ru') {
    defaultCurrency = list.filter((item: any) => {
      return item.name === 'RUB';
    })[0];
  }
  return defaultCurrency;
}

const defaultCurrency = getDefaultCurrency(config.currencies);

const amount = computed(() => {
  return document.getElementById('donateInput') as HTMLInputElement;
});

const currency = ref(defaultCurrency);

const changeAmount = () => {
  amount.value.value = currency.value.default;
};
const checkAmount = () => {
  if (amount.value.value < currency.value.default) {
    amount.value.value = currency.value.default;
  }
};
const pay = async () => {
  if (amount.value.value <= '0') {
    amount.value.value = '1';
  }
  await axios
    .post('/api/donate/createPayment', {
      locale: locale.value,
      amount: amount.value.value,
      order_id: `order-${Date.now()}`,
      currency: currency.value.name,
    })
    .then((response) => {
      if (response.data.success) {
        const url = response.data.response_url + `?lang=${locale.value}`;
        window.location.assign(url);
        window.open(url);
      } else {
        alert('Ошибка: не удалось получить ссылку на оплату');
      }
    })
    .catch((error) => {
      console.error('Ошибка:', error);
      alert('Ошибка при отправке запроса');
    });
};

onMounted(() => {
  nextTick(() => {
    checkAmount();
  });
});
</script>

<template>
  <ClientOnly>
    <div class="wrapper">
      <div class="card">
        <div class="card__top">
          <Icon class="card__top__image" :name="config.icons.donate" />
        </div>
        <div class="blur__glass">
          <h6 class="card__title">
            {{ t('donate_title') }}
          </h6>
          <div class="card__main">
            <input
              type="number"
              id="donateInput"
              name="amount"
              class="card__main__input"
              @change="checkAmount"
              :placeholder="t('donate_amount')"
              required
              size="10" />
            <h6>/</h6>
            <select class="card__main__select" v-model="currency" @change="changeAmount">
              <option v-for="curr in config.currencies" :value="curr">
                {{ curr.name + ' ' + curr.symbol }}
              </option>
            </select>
          </div>
          <div class="card__bottom">
            <ActionButton
              :text="t('donate_send')"
              :text-bold="true"
              text-color="#252525"
              :icon="config.icons.donate_pay"
              color="#50C878"
              :click="pay()"
              class="card__bottom__button"
              :outline="false" />
          </div>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<style scoped lang="scss">
@use 'assets/scss/screens' as *;

.wrapper {
  display: flex;
  flex-direction: column;
  height: 80vh;
  justify-content: center;

  @media screen and (max-width: $screen-sm) {
    width: 100%;
    padding: 1rem;
  }
}

.donate-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: fit-content;
  margin: auto;
}

.card {
  display: flex;
  flex-direction: column;

  &__top {
    display: flex;
    justify-content: center;
    justify-items: center;
    align-items: center;
    padding-bottom: 3rem;

    &__image {
      font-size: 10rem;
      color: #ff9100;

      @media screen and (max-width: $screen-sm) {
        color: #2c2044;
      }
    }

    .dark &__image {
      @media screen and (max-width: $screen-sm) {
        color: #ffffff;
      }
    }
  }

  &__title {
    width: 100%;
    text-align: center;
    color: #2c2044;
  }

  .dark &__title {
    color: #ffffff;
  }

  &__main {
    display: flex;
    height: 2rem;
    column-gap: 1rem;
    padding: 2rem 2rem;
    justify-content: center;
    align-items: center;
    -webkit-align-items: center;

    &__input {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border-radius: 2rem;
      background: transparent;
      min-width: 8rem;
      padding: 1rem;
      font-weight: bold;
      font-size: 1rem;
      border: 1px solid #a782ff !important;
      color: #2c2044 !important;
    }

    .dark &__input {
      color: #ffffff !important;
    }

    &__select {
      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      border-radius: 2rem;
      text-align: center;
      background: transparent;
      padding: 1rem;
      font-weight: bold;
      font-size: 1rem;
      border: 1px solid #a782ff !important;
      color: #2c2044 !important;
    }

    .dark &__select {
      color: #ffffff !important;
    }
  }

  &__bottom {
    display: flex;
    width: 100%;
    justify-content: center;
    justify-items: center;

    &__button {
      width: fit-content;
      height: 2.5rem;

      @media screen and (max-width: $screen-sm) {
        height: 3rem;
        width: fit-content;
      }
    }
  }
}
</style>
