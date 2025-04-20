# Use uma imagem leve
FROM python:3.11-slim

# Instalar cliente PostgreSQL
RUN apt update && apt install -y postgresql-client

# Definir diretório de trabalho
WORKDIR /app

# Copiar dependências
COPY requirements.txt .

# Instalar dependências
RUN pip install --no-cache-dir -r requirements.txt

# Copiar todo o código
COPY . .

# Expor porta
EXPOSE 8000

# Rodar Uvicorn (comando vem do docker-compose)
