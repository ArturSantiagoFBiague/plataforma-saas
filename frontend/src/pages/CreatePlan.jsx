import { useState } from 'react';
import { createPlan } from '../services/admin';
import { useNavigate } from 'react-router-dom';

export default function CreatePlan() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [features, setFeatures] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const featuresArray = features.split(',').map(f => f.trim());

    await createPlan({ name, description, price: parseFloat(price), features: featuresArray });

    alert('Plano criado com sucesso!');
    navigate('/admin/home');
  };

  return (
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Criar novo plano</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full border rounded p-2" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Descrição</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full border rounded p-2" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Preço (R$)</label>
          <input type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} className="w-full border rounded p-2" required />
        </div>

        <div>
          <label className="block text-sm font-medium">Recursos (separados por vírgula)</label>
          <input type="text" value={features} onChange={e => setFeatures(e.target.value)} className="w-full border rounded p-2" required />
        </div>

        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Criar Plano
        </button>
      </form>
    </div>
  );
}
