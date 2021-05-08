FROM node:alpine

WORKDIR /004-migrate/library

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]