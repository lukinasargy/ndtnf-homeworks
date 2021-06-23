FROM node:alpine

WORKDIR /008-nestjs-db/library

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm start"]
