import express from 'express';
import { authenticate } from '../middlewares/auth.middleware';
import  { isAdmin }  from '../middlewares/admin.middleware';
import { prisma } from '../lib/prisma';

const router = express.Router();

router.get('/admin', authenticate, isAdmin, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    res.json(users);
  } catch (err) {
    console.error('Erro ao buscar usuários:', err);
    res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

export default router;
