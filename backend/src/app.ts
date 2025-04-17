import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/users.routes';
import { PrismaClient } from '@prisma/client';
import { authenticate } from './middlewares/auth.middleware';
dotenv.config();

const app = express();
const prisma = new PrismaClient();

// Middlewares globais
app.use(cors({
  origin: 'http://localhost:5173', // Permite todas as origens (ajuste conforme necessário)
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
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
app.use('/api/auth', authRoutes); // Rotas de autenticação
app.use('/api/users', authenticate, userRoutes); // Rotas protegidas de usuários

// Middleware para rota não encontrada
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

export default app;


