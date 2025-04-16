import { Router } from 'express';
import { getPlans, getPlanById, createPlan, updatePlan, deletePlan } from '../controllers/plans.controller'; 
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate); // Todas as rotas protegidas

router.get('/', getPlans);
router.get('/:id', getPlanById);
router.post('/', createPlan);
router.put('/:id', updatePlan);
router.delete('/:id', deletePlan);

export default router;
