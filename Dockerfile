FROM node:13.7.0-alpine

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true

RUN apk add --no-cache \
      chromium

USER node

RUN mkdir -p /home/node/app

WORKDIR /home/node/app 

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]