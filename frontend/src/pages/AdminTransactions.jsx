import React, { useEffect, useState } from 'react';
import { getTransactions, updateTransactionStatus } from '../services/admin';
import Header from "../components/Header";

const AdminTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const data = await getTransactions();
      setTransactions(data);
    } catch (error) {
      console.error('Erro ao carregar transações:', error);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateTransactionStatus(id, newStatus);
      fetchTransactions(); // atualiza lista
    } catch (error) {
      alert('Erro ao atualizar status da transação.');
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="p-8">
      <Header />
      <h1 className="text-3xl font-bold mb-6">Transações Pendentes</h1>
      
      <div className="bg-white shadow rounded p-6">
        <ul className="space-y-4">
          {transactions.map((tx) => (
            <li key={tx.id} className="border-b pb-4 last:border-b-0">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-2 md:mb-0">
                  <p className="font-bold">{tx.user.name}</p>
                  <p className="text-gray-600">{tx.plan.name}</p>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    tx.status === 'paid' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {tx.status}
                  </span>
                </div>
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleStatusChange(tx.id, 'paid')}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                  >
                    Aprovar
                  </button>
                  <button 
                    onClick={() => handleStatusChange(tx.id, 'rejected')}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                  >
                    Negar
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminTransactions;