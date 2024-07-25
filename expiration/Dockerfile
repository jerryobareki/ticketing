FROM node:alpine

WORKDIR /app
COPY expiration/package.json expiration/package-lock.json* ./
RUN npm install
COPY . .

CMD ["npm", "start"]
