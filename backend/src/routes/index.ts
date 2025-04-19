import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './users.routes';
import planRoutes from './plans.routes';
import adminRoutes from './admin.routes';
const router = Router();

// Rotas agrupadas
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/plans', planRoutes);
router.use('/api/admin', adminRoutes);
export default router;
