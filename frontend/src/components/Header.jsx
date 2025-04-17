// src/components/Header.jsx
import { useAuth } from "../contexts/AuthContext";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="w-full px-6 py-4 bg-white shadow flex justify-between items-center">
      <h1 className="text-xl font-semibold text-indigo-600">Dashboard</h1>
      <div className="flex items-center gap-4">
        <span className="text-gray-700">Olá, {user?.name}</span>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
        >
          Sair
        </button>
      </div>
    </header>
  );
}
