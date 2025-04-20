import axios from 'axios';
import { Router } from 'express';
import { prisma } from '../controllers/plans.controller';

import { isAdmin } from '../middlewares/admin.middleware';
import { authenticate } from '../middlewares/auth.middleware';

import { getAllUsers } from '../controllers/users.controller';
import { getAdminDashboard, approveTransaction, createPlan, getTransactions } from '../controllers/admin.controller';

const router = Router();

// Rota protegida e exclusiva para administradores
router.get('/users', authenticate, isAdmin, getAllUsers);
router.get('/dashboard', isAdmin, getAdminDashboard);

router.post('/plans', isAdmin, createPlan);

router.patch('/transactions/:id/approve', isAdmin, approveTransaction);

router.get('/transactions', authenticate, isAdmin, getTransactions);




export default router;
