# Base image
FROM node:20.8.1

RUN apt-get update && apt-get install -y libnss3

WORKDIR /back

COPY . .

RUN yarn build

ENV NODE_ENV production