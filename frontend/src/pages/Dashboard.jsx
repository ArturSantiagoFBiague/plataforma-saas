// src/pages/Dashboard.jsx
import { useAuth } from "../contexts/AuthContext";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";


function AdicionarPropagandaModal({ onClose }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagem, setImagem] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("empresa_id", user.empresaId); // substitua conforme seu modelo
    formData.append("titulo", titulo);
    formData.append("descricao", descricao);
    formData.append("imagem", imagem);

    const response = await fetch("http://localhost:8000/propagandas/", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      alert("Propaganda enviada com sucesso!");
      onClose();
    } else {
      alert("Erro ao enviar propaganda");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      {hasVideowall && (
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded mb-4"
        >
          Adicionar Propaganda
        </button>
      )}

      {showModal && <AdicionarPropagandaModal onClose={() => setShowModal(false)} />}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl w-full max-w-md space-y-4">
        <h2 className="text-xl font-bold">Nova Propaganda</h2>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagem(e.target.files[0])}
          required
        />
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="text-gray-500">Cancelar</button>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Enviar</button>
        </div>
      </form>
    </div>
  );
}
export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/video-wall");
  };
  const PurchaseRedirect = () => {
    navigate("/comprar");
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Verificando sessão...</p>
      </div>
    );
  }
  const hasVideowall = user?.plano === 'videowall';
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex flex-col items-center justify-center h-full p-6">
        <h2 className="text-2xl font-bold mb-2">Bem-vindo, {user.name}!</h2>
        <p className="text-gray-600 mb-6">Você está autenticado com sucesso. 🎉</p>
        <button
          onClick={handleRedirect}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Ir para o Video Wall
        </button>
        <div className="my-4 border-t w-full max-w-md"></div>
        <button
          onClick={PurchaseRedirect}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Ver Planos
        </button>
      </main>
    </div>
  );
}
