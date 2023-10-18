# Base image
FROM node:20.8.1

RUN apt-get update && apt-get install -y libnss3 chromium ca-certificates

WORKDIR /back

COPY . .

ENV NODE_ENV production
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV PUPPETEER_EXECUTABLE_PATH /usr/bin/chromium-browser

RUN yarn build

