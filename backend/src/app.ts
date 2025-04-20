import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { PrismaClient } from '@prisma/client';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/users.routes';
import adminRoutes from './routes/admin.routes';

import { authenticate } from './middlewares/auth.middleware';
import { isAdmin } from './middlewares/admin.middleware';
import { errorMiddleware } from './middlewares/error.middleware';
import routes from './routes';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3002', 'http://172.18.0.3:3000', 'http://172.18.0.2:3000'];
// 🔌 Middlewares globais
app.use(cookieParser());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));
app.use(express.json());
app.use(morgan('dev'));

// ✅ Teste de conexão com o banco de dados
prisma.$connect()
  .then(() => console.log('✅ Banco de dados conectado com sucesso!'))
  .catch((err) => {
    console.error('❌ Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  });

// 🚦 Rotas públicas
app.use('/api/auth', authRoutes);

// 🔐 Rotas protegidas
app.use('/api/users', authenticate, userRoutes);

// 🔒 Rotas administrativas (precisa estar autenticado antes de verificar se é admin)
app.use('/api/admin', authenticate, isAdmin, adminRoutes);
app.use('/api', routes);
// 🧱 Rota não encontrada
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

// ⚠️ Middleware global de tratamento de erros
app.use(errorMiddleware);

export default app;
