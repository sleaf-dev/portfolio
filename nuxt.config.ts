export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  runtimeConfig: {
    public: {
      S3_BUCKET: process.env.S3_BUCKET,
      S3_URL: process.env.S3_URL,
      OAUTH_ID: process.env.OAUTH_ID,
      AUTH_ORIGIN: process.env.AUTH_ORIGIN,
      AUTH_TRUST_HOST: process.env.AUTH_TRUST_HOST,
    },
    private: {
      MONGODB_URL: process.env.MONGODB_URL,
      MONGODB_NAME: process.env.MONGODB_NAME,
      OAUTH_SECRET: process.env.OAUTH_SECRET,
      NUXT_SECRET: process.env.NUXT_SECRET,
      S3_ACCESS_KEY: process.env.S3_ACCESS_KEY,
      S3_SECRET_KEY: process.env.S3_SECRET_KEY,
    },
  },

  app: {
    pageTransition: false,
    layoutTransition: false,
    head: {
      title: 'sleaf.dev',
      htmlAttrs: {
        lang: 'ru',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'description', content: 'Портфолио самого великого человека' },
        { name: 'format-detection', content: 'telephone=no' },
      ],
      link: [
        { rel: 'icon', type: 'image/webp', href: '/favicons/favicon.webp' },
        { rel: 'icon', type: 'image/png', href: '/favicons/favicon.png' },
      ],
    },
  },

  css: ['~/assets/scss/global.scss', '~/assets/scss/screens.scss'],

  fonts: {
    families: [{ name: 'Arimo', provider: 'google' }],
  },

  icon: {
    serverBundle: {
      collections: ['mingcute'],
    },
  },

  auth: {
    isEnabled: true,
    provider: {
      type: 'authjs',
      trustHost: process.env.AUTH_TRUST_HOST === 'true',
      defaultProvider: 'github',
      addDefaultCallbackUrl: true,
    },
  },

  i18n: {
    locales: [{ code: 'ru', iso: 'ru-RU', name: 'Русский', file: 'ru.json' }],
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      fallbackLocale: 'ru',
    },
    strategy: 'no_prefix',
    defaultLocale: 'ru',
  },

  image: {
    provider: 'none',
  },

  routeRules: {
    '/**': {
      prerender: true,
      cache: {
        swr: true,
        maxAge: 120,
        staleMaxAge: 60,
        headersOnly: true,
      },
    },
  },

  nitro: {
    compressPublicAssets: true,
    routeRules: {
      '/**': { isr: false },
    },
  },

  experimental: {
    viewTransition: false,
    renderJsonPayloads: true,
  },

  sourcemap: true,

  devtools: { enabled: true },

  modules: ['@nuxt/image', '@nuxt/icon', '@nuxt/fonts', '@nuxtjs/i18n', '@sidebase/nuxt-auth'],
});
