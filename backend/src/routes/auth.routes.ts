import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';
import { authenticate, AuthRequest } from '../middlewares/auth.middleware';

const router = Router();

router.post('/login', login);
router.post('/register', register);

// Rota protegida para retornar os dados do usuário autenticado
router.get('/me', authenticate, (req: AuthRequest, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  const { id, name, email } = req.user;

  return res.status(200).json({ id, name, email });
});

export default router;
