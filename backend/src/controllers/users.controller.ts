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

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.user.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar usuário', error: err });
  }
};
