//backend/src/controllers/users.controller.ts
import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getUsers = async (_: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error: err });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar usuário', error: err });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updated = await prisma.user.update({
      where: { id },
      data,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar usuário', error: err });
  }
};

export const  deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  try {
    console.warn(`Procurando usuario  : ${userId}`);
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      console.warn(`Usuário não encontrado: ${userId}`);
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    await prisma.user.delete({ where: { id: userId } });

    return res.status(200).json({ message: 'Usuário deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    return res.status(500).json({ error: 'Erro interno ao deletar usuário' });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });
    return res.status(200).json({ users });
  } catch (error) {
    console.error('Erro ao buscar dados de admin:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};

