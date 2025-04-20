import { Request, Response, NextFunction } from 'express';

// Middleware global de tratamento de erros
export function errorMiddleware(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error('❌ Erro capturado pelo middleware:', err);

  const status = err.status || 500;
  const message = err.message || 'Erro interno do servidor';
  const details = err.details || null;

  res.status(status).json({
    success: false,
    message,
    ...(details && { details }),
  });
}
