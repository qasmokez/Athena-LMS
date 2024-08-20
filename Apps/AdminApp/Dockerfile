FROM node:20-alpine AS base

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --silent --legacy-peer-deps

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev"]