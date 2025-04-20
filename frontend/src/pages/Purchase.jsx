import { useEffect, useState } from 'react';
import Header from "../components/Header";
import { getPlans, purchasePlan } from '../services/plans';

export default function Purchase() {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    async function fetchPlans() {
      const response = await getPlans();
      setPlans(response);
    }
    fetchPlans();
  }, []);

  const handlePurchase = async (planId) => {
    const data = await purchasePlan(planId);
    setPaymentData(data);
    setSelectedPlan(plans.find(p => p.id === planId));
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Header />
      <main className="flex flex-col items-center justify-center h-full p-6">
        <h1 className="text-2xl font-bold mb-6">Escolha um plano</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map(plan => (
            <div key={plan.id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{plan.name}</h2>
              <p className="text-sm text-gray-600">{plan.description}</p>
              <p className="text-lg mt-2 font-bold">R$ {plan.price.toFixed(2)}</p>
              <button
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={() => handlePurchase(plan.id)}
              >
                Comprar
              </button>
            </div>
          ))}
        </div>

        {paymentData && (
          <div className="mt-10 border-t pt-6">
            <h2 className="text-xl font-bold mb-2">Pagamento do plano: {selectedPlan?.name}</h2>
            <p className="mb-2">Chave PIX: <strong>{paymentData.pixKey}</strong></p>
            <img
              src={paymentData.qrCode}
              alt="QR Code"
              className="w-64 h-64 border rounded"
            />
            <p className="mt-2 text-sm text-gray-600">Aguardando aprovação do administrador.</p>
          </div>
        )}
      </main>
    </div>
  );
}
