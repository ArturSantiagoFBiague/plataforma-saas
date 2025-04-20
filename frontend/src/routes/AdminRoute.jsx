// AdminRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();
  console.log("Tentativa de login ADMIN:", user);

  if (loading) return <div>Carregando...</div>;
  if (!user || user.role !== 'ADMIN') return <Navigate to="/" />;
  console.log("user em AdminRoute:", user);

  return children;
}
