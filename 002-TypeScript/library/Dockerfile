FROM node:alpine

WORKDIR /009-docker/library

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
