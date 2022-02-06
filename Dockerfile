FROM node:17 as base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm ci

COPY . .

FROM base as production

RUN npm run build
