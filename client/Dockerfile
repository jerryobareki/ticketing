FROM node:alpine

WORKDIR /app
COPY client/package.json client/package-lock.json* ./
RUN npm install
COPY . .

CMD ["npm", "run", "dev"]