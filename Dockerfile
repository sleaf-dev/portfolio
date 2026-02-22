FROM node:24-alpine

COPY ./.output /nuxt/.output
COPY ./.nuxt /nuxt/i18n
COPY ./i18n /nuxt/i18n

CMD ["node", "/nuxt/.output/server/index.mjs"]