FROM node:18-alpine

WORKDIR /app

COPY . .
RUN npm install --legacy-peer-deps \
 && npm install --save-dev @types/bcryptjs @types/cors

RUN npm install && npm run build

RUN npm install -g serve && apk add --no-cache curl

EXPOSE 3001

CMD ["serve", "-s", "dist", "-l", "3000", "-n"]
