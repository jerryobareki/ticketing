FROM node:alpine

WORKDIR /app
COPY tickets/package.json tickets/package-lock.json* ./
RUN npm install --omit=dev
COPY . .

CMD ["npm", "start"]