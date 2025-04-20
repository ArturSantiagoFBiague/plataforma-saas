import { useEffect, useState } from 'react';
import { getAdminData } from '../services/admin';
import { useAuth } from '../contexts/AuthContext';

export default function AdminDashboard() {
  const { user } = useAuth();
  const [adminData, setAdminData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
          try {
            const data = await getAdminData();
            setAdminData(data);
          } catch (error) {
            console.error('Erro ao buscar dados de admin:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchAdminData();
      }, []);
    
      if (loading) return <div className="p-4">Carregando dados do admin...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Painel do Administrador</h1>

      {adminData.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 shadow-sm rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left py-2 px-4 border-b">Nome</th>
                <th className="text-left py-2 px-4 border-b">Email</th>
                <th className="text-left py-2 px-4 border-b">Telefone</th>
                <th className="text-left py-2 px-4 border-b">Papel</th>
                <th className="text-left py-2 px-4 border-b">Status</th>
                <th className="text-left py-2 px-4 border-b">Criado em</th>
              </tr>
            </thead>
            <tbody>
              {adminData.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b">{user.phone}</td>
                  <td className="py-2 px-4 border-b">{user.role}</td>
                  <td className="py-2 px-4 border-b">
                    {user.active ? (
                      <span className="text-green-600 font-medium">Ativo</span>
                    ) : (
                      <span className="text-red-600 font-medium">Inativo</span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Nenhum dado encontrado.</p>
      )}
    </div>
  );
}
