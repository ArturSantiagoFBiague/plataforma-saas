import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes'; // Rota de autenticação
import userRoutes from './routes/users.routes'; // Rota de usuários
import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import { authenticate } from './middlewares/auth.middleware';

dotenv.config(); // Carregar as variáveis de ambiente

const app = express();

app.use('/api/users', authenticate, userRoutes);  // Protege as rotas de usuários
const prisma = new PrismaClient();

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Teste de conexão com o banco de dados
prisma.$connect()
  .then(() => console.log('✅ Banco de dados conectado com sucesso!'))
  .catch((err) => {
    console.error('❌ Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  });

// Rotas
app.use('/api/auth', authRoutes);  // Prefixo para rotas de autenticação
app.use('/api/users', userRoutes); // Prefixo para rotas de usuários

// Middleware para rota não encontrada
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

export default app;
