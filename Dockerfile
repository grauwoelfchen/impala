FROM node:12-slim as builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --ignore-scripts

COPY . ./

RUN npm run --unsafe-perm build:production

FROM node:12-slim

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/dst dst

RUN npm install --only=production

CMD ["npm", "start"]
