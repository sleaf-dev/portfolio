FROM node:16.15.0-slim

COPY /.output /nuxt/.output
COPY ./config /nuxt/config
COPY ./i18n /nuxt/i18n

RUN mkdir -p /nuxt/.output/server/content/projects
RUN mkdir -p /nuxt/.output/server/content/donate

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=3000

EXPOSE 3000

ENV NODE_ENV=production

CMD ["node", "/nuxt/.output/server/index.mjs"]
