FROM node:alpine

WORKDIR /app
COPY payments/package.json payments/package-lock.json* ./
RUN npm install
COPY payments .

CMD ["npm", "start"]
