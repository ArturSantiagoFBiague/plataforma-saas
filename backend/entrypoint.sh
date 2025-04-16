#!/bin/sh

# Espera o banco de dados ficar disponível
echo "Aguardando o banco de dados ficar disponível..."

# Aguarda até conseguir conexão com o banco
until nc -z -v -w30 db 5432
do
  echo "Aguardando o PostgreSQL..."
  sleep 2
done

# Aplica as migrações (se houver)
echo "Executando as migrações do banco de dados..."
npx prisma migrate deploy

# Inicia a aplicação
echo "Iniciando o servidor..."
npm start
