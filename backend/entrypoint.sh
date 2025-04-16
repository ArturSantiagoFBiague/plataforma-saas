#!/bin/sh

echo "Aguardando o banco de dados ficar disponível..."

until nc -z db 5432; do
  sleep 1
done

echo "Banco de dados disponível! Rodando migrations..."

npx prisma migrate dev --name init 
docker-compose exec backend npx prisma migrate deploy
npx prisma generate

echo "Iniciando aplicação..."
npm run dev
