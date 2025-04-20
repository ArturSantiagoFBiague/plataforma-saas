import { useState, useEffect } from 'react';
import { getAdminData } from '../services/admin';
import { useAuth } from '../contexts/AuthContext';
import Header from "../components/Header";
import { deleteUser } from '../services/users'; 
import EditUserModal from '../components/EditUserModal'; // Importando o modal
import { useNavigate } from "react-router-dom";


export default function AdminDashboard() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const data = await getAdminData();
        setUsers(data.users);
      } catch (error) {
        console.error('Erro ao buscar dados de admin:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleEdit = (user) => {
    setSelectedUser(user); // Define o usuário para editar
    setIsModalOpen(true); // Abre o modal
  };

  const handleSaveUser = async (userData) => {
    // Aqui você chamaria a função para atualizar o usuário na API
    console.log('Salvar usuário:', userData);
    // Atualize os dados localmente após salvar, por exemplo:
    setUsers((prevUsers) =>
      prevUsers.map((u) => (u.id === userData.id ? { ...u, ...userData } : u))
    );
    setIsModalOpen(false); // Fecha o modal
  };

  const handleDelete = async (userId) => {
    const confirm = window.confirm('Tem certeza que deseja excluir este usuário?');
    if (confirm) {
      try {
        await deleteUser(userId); // Chamada à API para excluir o usuário
        setUsers(users.filter((u) => u.id !== userId)); // Remove o usuário da lista local
        alert('Usuário excluído com sucesso!');
      } catch (error) {
        alert('Erro ao excluir usuário. Tente novamente!');
      }
    }
  };
  const handleRedirect = () => {
    navigate("/video-wall");
  };


  if (loading) return <div className="p-4">Carregando dados do admin...</div>;

  return (
    <div className="p-8">
      <Header />
      <main className="flex flex-col items-center justify-center h-full p-6"></main>
        <h1 className="text-2xl font-bold mb-6">Painel do Administrador</h1>
        <button
          onClick={handleRedirect}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Ir para o Video Wall
        </button>

        {users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border-b text-left">Nome</th>
                  <th className="px-4 py-2 border-b text-left">Email</th>
                  <th className="px-4 py-2 border-b text-left">Telefone</th>
                  <th className="px-4 py-2 border-b text-left">Papel</th>
                  <th className="px-4 py-2 border-b text-left">Plano</th>
                  <th className="px-4 py-2 border-b text-left">Criado em</th>
                  <th className="px-4 py-2 border-b text-left">Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{u.name}</td>
                    <td className="px-4 py-2 border-b">{u.email}</td>
                    <td className="px-4 py-2 border-b">{u.phone}</td>
                    <td className="px-4 py-2 border-b">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                          u.role === 'ADMIN'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="px-4 py-2 border-b">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                          u.userPlan === 'VIDEOWALL'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {u.userPlan}
                      </span>
                    </td>
                    <td className="px-4 py-2 border-b">
                      {new Date(u.createdAt).toLocaleString('pt-BR')}
                    </td>
                    <td className="px-4 py-2 border-b space-x-2">
                      <button
                        onClick={() => handleEdit(u)}
                        className="px-3 py-1 text-sm text-white bg-yellow-500 hover:bg-yellow-600 rounded"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="px-3 py-1 text-sm text-white bg-red-500 hover:bg-red-600 rounded"
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Nenhum usuário encontrado.</p>
        )}

        {isModalOpen && (
          <EditUserModal
            user={selectedUser}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveUser}
          />
        )}
    </div>
  );
}
