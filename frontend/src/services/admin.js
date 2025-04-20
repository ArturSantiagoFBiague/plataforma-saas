import api from './api';

export const getAdminData = async () => {
  const response = await api.get('/admin/users');
  return response.data;
};

// Função para excluir um usuário
export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Falha ao excluir o usuário');
    }

    return response.json(); // Supondo que a resposta seja JSON
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    throw error;
  }
};

export const getDashboardInfo = async () => {
  const response = await api.get('/admin/dashboard');
  return response.data;
};

export const createPlan = async (planData) => {
  const response = await api.post('/admin/plans', planData);
  return response.data;
};
export const getTransactions = async (id) => {
  try {
    const response = await api.get('/admin/transactions', {
      withCredentials: true, // importante se estiver usando cookies para autenticação
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar transações:', error);
    throw error;
  }
};

export const updateTransactionStatus = async (id, status) => {
  try {
    const response = await api.patch(`/admin/transactions/${id}/approve`, { status }, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar status da transação:', error);
    throw error;
  }
};
