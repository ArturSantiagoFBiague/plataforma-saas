// src/pages/Dashboard.jsx
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Verificando sessão...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex flex-col items-center justify-center h-full p-6">
        <h2 className="text-2xl font-bold mb-2">Bem-vindo, {user.name}!</h2>
        <p className="text-gray-600">Você está autenticado com sucesso. 🎉</p>
      </main>
    </div>
  );
}
