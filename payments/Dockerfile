FROM node:alpine

WORKDIR /app
COPY payments/package.json payments/package-lock.json* ./
RUN npm install --omit=production
COPY . .

CMD ["npm", "start"]
