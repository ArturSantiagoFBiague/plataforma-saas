import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { register } from "../services/auth";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await register(formData);
      console.log("Usuário registrado com sucesso:", response);
      navigate("/login");
    } catch (err) {
      console.error("Erro no registro:", err);
      setError(err.response?.data?.message || "Erro ao registrar usuário.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Criar Conta</h2>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Nome</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-indigo-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-indigo-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Senha</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-indigo-300"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Telefone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring focus:border-indigo-300"
              placeholder="(11) 98001-1008"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-xl hover:bg-indigo-700 transition"
          >
            Registrar
          </button>
        </form>
        <div className="text-sm text-center text-gray-600 mt-4">
          Já tem uma conta?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Entrar
          </Link>{" "}
          ou{" "}
          <Link to="/" className="text-indigo-600 hover:underline">
            Voltar para o início
          </Link>
        </div>
      </div>
    </div>
  );
}
