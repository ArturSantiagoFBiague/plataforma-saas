import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';  // Importando os controladores

const router = Router();

// Definição das rotas de autenticação
router.post('/login', login);  // Rota para login
router.post('/register', register);  // Rota para registro

export default router;
