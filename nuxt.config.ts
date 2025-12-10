import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
  app: {
    pageTransition: false,
    layoutTransition: false,
    head: {
      title: 'SolsticeLeaf',
      htmlAttrs: {
        lang: 'en',
      },
      script: [
        {
          src: 'https://metrics.sleaf.dev/api/script.js',
          'data-site-id': '4',
          defer: true,
        },
      ],
      meta: [{ charset: 'utf-8' }, { name: 'description', content: '' }, { name: 'format-detection', content: 'telephone=no' }],
      link: [
        { rel: 'icon', type: 'image/webp', href: 'https://s3.sleaf.dev/portfolio/favicon.webp' },
        { rel: 'icon', type: 'image/png', href: 'https://s3.sleaf.dev/portfolio/favicon.png' },
      ],
    },
  },
  ssr: false,
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
  compatibilityDate: '2025-01-29',
  devtools: { enabled: true },
  modules: ['@nuxtjs/i18n', '@nuxt/image', '@nuxtjs/device', '@nuxt/icon', '@nuxt/fonts', '@nuxtjs/sitemap', '@nuxtjs/robots'],
  icon: {
    serverBundle: {
      collections: ['mingcute'],
    },
  },
  plugins: ['@/plugins/Vue3Marquee.client.ts'],
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
      { code: 'ru', iso: 'ru-RU', name: 'Русский', file: 'ru.json' },
    ],
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      fallbackLocale: 'en',
    },
    strategy: 'prefix',
    defaultLocale: 'en',
  },
  site: {
    url: 'https://sleaf.dev',
    name: 'SolsticeLeaf',
  },
  robots: {
    blockNonSeoBots: true,
  },
  css: ['@/assets/scss/global.scss', '@/assets/scss/screens.scss'],
  fonts: {
    families: [
      { name: 'Mori-Regular', src: 'https://s3.sleaf.dev/portfolio/fonts/PPMori-Regular.otf', weight: 'regular' },
      { name: 'Mori-SemiBold', src: 'https://s3.sleaf.dev/portfolio/fonts/PPMori-SemiBold.otf', weight: 'bold' },
    ],
  },
  vite: {
    plugins: [svgLoader()],
  },
  runtimeConfig: {
    public: {
      CRYPTOCLOUD_SHOP_ID: process.env.CRYPTOCLOUD_SHOP_ID,
      DATABASE_NAME: process.env.DATABASE_NAME,
      DATABASE_URL: process.env.DATABASE_URL,
    },
    private: {
      CRYPTOCLOUD_API_KEY: process.env.CRYPTOCLOUD_API_KEY,
    },
  },
});
