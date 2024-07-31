FROM node:alpine

WORKDIR /app
COPY tickets/package.json tickets/package-lock.json* ./
RUN npm install
COPY tickets .

CMD ["npm", "start"]
