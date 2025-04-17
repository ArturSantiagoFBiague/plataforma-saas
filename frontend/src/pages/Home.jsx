// src/pages/Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-white px-4">
      <img
        src="../assets/image.png?text=Logo"
        alt="Logo"
        className="mb-6 w-40 h-40 object-contain"
      />
      <h1 className="text-3xl font-bold text-center mb-4">
        Bem-vindo à Plataforma SaaS
      </h1>
      <p className="text-gray-600 text-center mb-8">
        Acesse sua conta ou crie uma nova para começar a usar o sistema.
      </p>
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-2 bg-white border border-indigo-600 text-indigo-600 rounded-xl hover:bg-indigo-50 transition"
        >
          Registrar
        </Link>
      </div>
    </div>
  );
}
