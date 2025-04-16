import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export const getPlans = async (_: Request, res: Response) => {
  try {
    const plans = await prisma.plan.findMany();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar planos', error: err });
  }
};

export const getPlanById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const plan = await prisma.plan.findUnique({ where: { id } });
    if (!plan) return res.status(404).json({ message: 'Plano não encontrado' });

    res.json(plan);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar plano', error: err });
  }
};

export const createPlan = async (req: Request, res: Response) => {
  const data = req.body;

  try {
    const newPlan = await prisma.plan.create({ data });
    res.status(201).json(newPlan);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar plano', error: err });
  }
};

export const updatePlan = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const updated = await prisma.plan.update({
      where: { id },
      data,
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar plano', error: err });
  }
};

export const deletePlan = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.plan.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: 'Erro ao deletar plano', error: err });
  }
};
