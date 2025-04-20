import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './users.routes';
import planRoutes from './plans.routes';
import adminRoutes from './admin.routes';
import { getMe } from '../controllers/auth.controller';
import { authenticate } from '../middlewares/auth.middleware';


const router = Router();

// Rotas agrupadas
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/plans', planRoutes);
router.use('/', adminRoutes);

router.get('/me', authenticate, getMe);
//router.get('/admin', isAdmin, getAllUsers);
export default router;
