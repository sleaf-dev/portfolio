FROM node:24-alpine

WORKDIR /nuxt

COPY . .

CMD ["node", ".output/server/index.mjs"]