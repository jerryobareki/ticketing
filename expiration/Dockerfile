FROM node:alpine

WORKDIR /app
COPY expiration/package.json expiration/package-lock.json* ./
RUN npm install --omit=dev
COPY . .

CMD ["npm", "start"]