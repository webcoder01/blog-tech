FROM node:18.8-alpine as base

FROM base as builder

WORKDIR /app
COPY package*.json ./

COPY . .
RUN npm install
RUN npm build

FROM base as runtime

ENV NODE_ENV=production

WORKDIR /app
COPY package*.json  ./

RUN npm install --production

EXPOSE 3000

CMD ["node", "dist/server.js"]
