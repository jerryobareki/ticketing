FROM node:alpine

WORKDIR /app
COPY orders/package.json orders/package-lock.json ./
RUN npm install
COPY orders .

CMD ["npm", "start"]
