FROM node:alpine

WORKDIR /app
COPY auth/package.json auth/package-lock.json* ./
RUN npm install --omit=production
COPY . .

CMD ["npm", "start"]
