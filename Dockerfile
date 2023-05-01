FROM node:12.20.1-alpine AS build-stage

ARG NPM_TOKEN

ARG ENV=production

RUN mkdir -p /tmp/build

COPY . /tmp/user/app

RUN touch /tmp/build/.npmrc && echo $'@aia-digital:registry=https://pkgs.dev.azure.com/AIASingapore/48343aa2-4975-4b6e-96ba-a5bbdaaf9d58/_packaging/default-feed/npm/registry/\nalways-auth=true' >> /tmp/user/app/.npmrc && \
  echo "//pkgs.dev.azure.com/AIASingapore/48343aa2-4975-4b6e-96ba-a5bbdaaf9d58/_packaging/default-feed/npm/registry/:username=AIASingapore">> /tmp/user/app/.npmrc && \
  echo "//pkgs.dev.azure.com/AIASingapore/48343aa2-4975-4b6e-96ba-a5bbdaaf9d58/_packaging/default-feed/npm/registry/:_password=${NPM_TOKEN}" >> /tmp/user/app/.npmrc && \
  echo "//pkgs.dev.azure.com/AIASingapore/48343aa2-4975-4b6e-96ba-a5bbdaaf9d58/_packaging/default-feed/npm/registry/:email=abc@aia.com" >> /tmp/user/app/.npmrc && \
  echo "//pkgs.dev.azure.com/AIASingapore/48343aa2-4975-4b6e-96ba-a5bbdaaf9d58/_packaging/default-feed/npm/:username=AIASingapore">> /tmp/user/app/.npmrc && \
  echo "//pkgs.dev.azure.com/AIASingapore/48343aa2-4975-4b6e-96ba-a5bbdaaf9d58/_packaging/default-feed/npm/:_password=${NPM_TOKEN}" >> /tmp/user/app/.npmrc && \
  echo "//pkgs.dev.azure.com/AIASingapore/48343aa2-4975-4b6e-96ba-a5bbdaaf9d58/_packaging/default-feed/npm/:email=abc@aia.com" >> /tmp/user/app/.npmrc

WORKDIR /tmp/user/app

COPY deploy/config/env.${ENV} .env

RUN npm ci

RUN npm run build

FROM nginx:stable-alpine

COPY deploy/config/nginx.conf /etc/nginx/nginx.conf

COPY --from=build-stage /tmp/user/app/build /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]