# Etapa 1: Builder
FROM node:18-alpine AS builder

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# Instala dependências
RUN npm install cors bcryptjs \
  && npm install --legacy-peer-deps \
  && npm install --save-dev @types/bcryptjs @types/cors prisma \
  && npm install @prisma/client 



# Copia todo o código, incluindo .env e scripts
COPY . .

# Garante permissões de execução no script de entrada
RUN chmod +x entrypoint.sh

# Gera o cliente Prisma e compila o TypeScript
RUN npx prisma generate && npm run build


# Etapa 2: Runner
FROM node:18-alpine

# Diretório de trabalho
WORKDIR /app

# Copia a build final e dependências
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh

# Garante permissões de execução no container
RUN chmod +x entrypoint.sh

# Expõe a porta do backend
EXPOSE 3000

# Usa o script como ponto de entrada
ENTRYPOINT ["./entrypoint.sh"]
