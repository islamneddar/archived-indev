# Base image
FROM node:20.8.1

RUN apt-get update && apt-get install -y libnss3

WORKDIR /app

COPY package*.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

ENV NODE_ENV production