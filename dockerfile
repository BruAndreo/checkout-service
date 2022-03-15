FROM node:12.22.10-alpine3.14

WORKDIR /app

COPY package*.json /app/
COPY tsconfig.json /app/
COPY .env /app/
COPY src /app/src
COPY proto /app/proto

RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
