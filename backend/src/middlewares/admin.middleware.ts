import { Request, Response, NextFunction } from 'express';

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;
  if (!user || user.role !== 'ADMIN') {
    return res.status(403).json({ message: 'Acesso restrito a administradores' });
  }
  next();
};
