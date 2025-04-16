import { Router } from 'express';
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/users.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate); // Todas as rotas protegidas

router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;
