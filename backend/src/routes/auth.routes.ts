import { Router } from 'express';
import { login, register } from '../controllers/auth.controller';
import { authenticate } from "../middlewares/auth.middleware";
import { JwtPayload } from 'jsonwebtoken';

const router = Router();

router.post('/login', login);
router.post('/register', register);
router.get("/me", authenticate, async (req, res) => {
    const user = req.user as JwtPayload;
    if (!user || typeof user === "string") {
        return res.status(401).json({ error: "Unauthorized" });
    }
    res.json({ id: user.id, name: user.name, email: user.email });
  });
export default router;
