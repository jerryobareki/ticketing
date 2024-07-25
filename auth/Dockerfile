FROM node:alpine

WORKDIR /app
COPY auth/package.json auth/package-lock.json* ./
RUN npm install
COPY . .

CMD ["npm", "start"]
