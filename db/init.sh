#!/bin/bash
set -e

echo "▶️ Executando script de inicialização do banco de dados..."

psql -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = 'saas'" | grep -q 1 || \
psql -U postgres -c "CREATE DATABASE saas;"

psql -U postgres -tc "SELECT 1 FROM pg_roles WHERE rolname = 'saas'" | grep -q 1 || \
psql -U postgres -c "CREATE USER saas WITH PASSWORD 'senha_segura';"

psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE saas TO saas;"

# Criar o novo schema 'novoschema' se não existir
if ! psql -U postgres -tc "SELECT 1 FROM information_schema.schemata WHERE schema_name = 'novoschema'" | grep -q 1; then
  echo "Schema 'novoschema' não encontrado. Criando..."
  execute_psql "CREATE SCHEMA novoschema;"
else
  echo "Schema 'novoschema' já existe."
fi

# Conceder permissões no novo schema 'novoschema' para o usuário 'saas'
echo "Concedendo permissões no schema 'novoschema' para o usuário 'saas'..."
execute_psql "GRANT ALL ON SCHEMA novoschema TO saas;"
execute_psql "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA novoschema TO saas;"
execute_psql "GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA novoschema TO saas;"
execute_psql "ALTER DEFAULT PRIVILEGES IN SCHEMA novoschema GRANT ALL ON TABLES TO saas;"  # Garantir que novas tabelas também terão permissões

echo "✅ Banco de dados 'saas' inicializado, schema 'novoschema' criado e usuário 'saas' com permissões adequadas."
