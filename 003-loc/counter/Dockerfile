FROM node:alpine

WORKDIR /009-docker/counter

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "index.js"]