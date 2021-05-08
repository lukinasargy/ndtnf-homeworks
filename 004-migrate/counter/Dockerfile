FROM node:alpine

WORKDIR /004-migrate/counter

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["node", "index.js"]