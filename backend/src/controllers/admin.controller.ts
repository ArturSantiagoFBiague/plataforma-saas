import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import axios from 'axios';

export const approveTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    console.log(`🔍 Buscando transação com ID: ${id}`);
    const transaction = await prisma.transaction.findUnique({
      where: { id },
      include: {
        user: true,
        plan: true,
      },
    });

    if (!transaction) {
      console.error(`❌ Transação não encontrada: ${id}`);
      return res.status(404).json({ message: 'Transação não encontrada' });
    }

    if (transaction.status === 'paid') {
      console.warn(`⚠️ Transação já aprovada: ${id}`);
      return res.status(400).json({ message: 'Transação já aprovada' });
    }

    if (!transaction.user.id || !transaction.user.name || !transaction.user.email || !transaction.user.phone || !transaction.plan) {
      console.error('❌ Dados incompletos para envio ao videowall:', {
        empresa_id: transaction.user.id,
        nome: transaction.user.name,
        cnpj: '00000000000000',
        email: transaction.user.email,
        telefone: transaction.user.phone,
        plano_ativo: true,
      });
      return res.status(400).json({ message: 'Dados incompletos para envio ao videowall' });
    }

    console.log('📤 Enviando dados para a API externa:', {
      empresa_id: transaction.user.id,
      nome: transaction.user.name,
      cnpj: '00000000000000', // substituir quando necessário
      email: transaction.user.email,
      telefone: transaction.user.phone,
      plano_ativo: true,
    });

    // Envio para API externa
    await axios.post('http://plataforma-saas_videowall:8000/empresa/status', {
      empresa_id: transaction.user.id,
      nome: transaction.user.name,
      cnpj: '00000000000000', // substituir quando necessário
      email: transaction.user.email,
      telefone: transaction.user.phone,
      plano_ativo: true, 
    });

    console.log(`✅ Atualizando status da transação para 'paid': ${id}`);
    await prisma.transaction.update({
      where: { id },
      data: { status: 'paid' },
    });

    return res.json({ message: 'Transação aprovada e enviada à API externa.' });
  } catch (error) {
    console.error('❌ Erro ao aprovar transação:', error);
    return res.status(500).json({ message: 'Erro ao aprovar transação', error });
  }
};

export const getAdminDashboard = async (req: Request, res: Response) => {
  const users = await prisma.user.count();
  const plans = await prisma.plan.count();
  const pendingTransactions = await prisma.transaction.count({
    where: { status: 'pending' },
  });

  return res.json({ users, plans, pendingTransactions });
};
  
export const createPlan = async (req: Request, res: Response) => {
  const { name, description, price, features } = req.body;

  const newPlan = await prisma.plan.create({
    data: {
      name,
      description,
      price,
      features,
    },
  });

  return res.status(201).json(newPlan);
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
      const transactions = await prisma.transaction.findMany({
        include: {
          user: true,
          plan: true,
        },
      });
      return res.json(transactions);
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
      return res.status(500).json({ message: 'Erro ao buscar transações' });
    }

}
