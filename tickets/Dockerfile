FROM node:alpine

WORKDIR /app
COPY tickets/package.json tickets/package-lock.json* ./
RUN npm install --omit=production
COPY . .

CMD ["npm", "start"]
