FROM node:lts-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci
COPY . .
EXPOSE 8002
CMD ["npm","start"]
