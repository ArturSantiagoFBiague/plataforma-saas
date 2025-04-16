FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install && npm run build

RUN npm install -g serve && apk add --no-cache curl

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "0.0.0.0:3000", "-n"]
