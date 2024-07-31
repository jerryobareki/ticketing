FROM node:alpine

WORKDIR /app
COPY expiration/package.json expiration/package-lock.json ./
RUN npm install
COPY expiration .

CMD ["npm", "start"]
