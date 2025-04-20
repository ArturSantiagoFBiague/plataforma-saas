import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboardInfo } from '../services/admin';
import Header from "../components/Header";

export default function HomeAdmin() {
  const [info, setInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const data = await getDashboardInfo();
      setInfo(data);
    }
    fetchData();
  }, []);

  return (
    <div className="p-8">
      <Header />
      <h1 className="text-3xl font-bold mb-6">Painel do Administrador</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white shadow rounded p-6 text-center">
          <p className="text-sm text-gray-500">Usuários cadastrados</p>
          <p className="text-2xl font-bold">{info?.users || 0}</p>
        </div>
        <div className="bg-white shadow rounded p-6 text-center">
          <p className="text-sm text-gray-500">Planos disponíveis</p>
          <p className="text-2xl font-bold">{info?.plans || 0}</p>
        </div>
        <div className="bg-white shadow rounded p-6 text-center">
          <p className="text-sm text-gray-500">Transações pendentes</p>
          <p className="text-2xl font-bold">{info?.pendingTransactions || 0}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => navigate('/admin/transactions')}
        >
          Aprovar Transações
        </button>
        <button
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
          onClick={() => navigate('/admin')}
        >
          Gerenciar Usuários
        </button>
        <button
          className="px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700"
          onClick={() => navigate('/admin/propagandas')}
        >
          Gerenciar Propagandas
        </button>
        <button
          className="px-6 py-3 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          onClick={() => navigate('/admin/create-plan')}
        >
          Criar Novo Plano
        </button>
      </div>
    </div>
  );
}
