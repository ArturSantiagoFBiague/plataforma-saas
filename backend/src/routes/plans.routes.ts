import { Router } from 'express';
import { getPlans, getPlanById, createPlan, updatePlan, deletePlan, prisma } from '../controllers/plans.controller'; 
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate); // Todas as rotas protegidas
router.post('/comprar/:planId', authenticate, async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Usuário não autenticado' });
    }
    const userId = req.user.id;
    const { planId } = req.params;
  
    const plan = await prisma.plan.findUnique({ where: { id: planId } });
    if (!plan) return res.status(404).json({ message: 'Plano não encontrado' });
  
    // Simulação de geração de cobrança PIX
    const qrCode = 'https://via.placeholder.com/300x300.png?text=QR+Code+PIX';
    const pixKey = 'chave-pix-fake';
  
    const transaction = await prisma.transaction.create({
        data: {
            userId,
            planId,
            qrCode,
            pixKey,
        },
    });

    return res.json({ qrCode, pixKey, transactionId: transaction.id });
  });
router.get('/', getPlans);
router.get('/:id', getPlanById);
router.post('/', createPlan);
router.put('/:id', updatePlan);
router.delete('/:id', deletePlan);

export default router;
