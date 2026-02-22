FROM node:24-alpine

COPY ./.output /nuxt/.output
COPY ./i18n /nuxt/i18n

CMD ["node", "/nuxt/.output/server/index.mjs"]