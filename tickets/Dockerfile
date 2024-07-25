FROM node:alpine

WORKDIR /app
COPY tickets/package.json tickets/package-lock.json* ./
RUN npm install
COPY . .

CMD ["npm", "start"]
