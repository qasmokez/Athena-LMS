FROM node:20-alpine AS Base

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install --silent

COPY . .

EXPOSE 3010

CMD ["npm", "start"]