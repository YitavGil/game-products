FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV TS_NODE_TRANSPILE_ONLY=true

RUN npm run build

EXPOSE 5000

CMD ["npm", "start"]