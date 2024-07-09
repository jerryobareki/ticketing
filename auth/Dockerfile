FROM node:alpine

WORKDIR /app
COPY auth/package.json auth/package-lock.json* ./
RUN npm install --omit=dev
COPY . .

CMD ["npm", "start"]