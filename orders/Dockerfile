FROM node:alpine

WORKDIR /app
COPY orders/package.json orders/package-lock.json* ./
RUN npm install --omit=dev
COPY . .

CMD ["npm", "start"]