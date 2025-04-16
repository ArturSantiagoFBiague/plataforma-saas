#!/bin/bash
set -e

echo "▶️ Executando script de inicialização do banco de dados..."

psql -U postgres -tc "SELECT 1 FROM pg_database WHERE datname = 'plataforma'" | grep -q 1 || \
psql -U postgres -c "CREATE DATABASE plataforma;"

psql -U postgres -tc "SELECT 1 FROM pg_roles WHERE rolname = 'saas'" | grep -q 1 || \
psql -U postgres -c "CREATE USER saas WITH PASSWORD 'senha_segura';"

psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE plataforma TO saas;"
