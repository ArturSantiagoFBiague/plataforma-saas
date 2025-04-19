import { AuthProvider } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const { user, loading } = AuthProvider();

  if (loading) return null;

  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/admin" />;
  }

  return children;
}
