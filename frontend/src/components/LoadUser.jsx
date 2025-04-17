import { useEffect } from "react";
import { getCurrentUser } from "../services/auth";

const LoadUser = ({ setUser, setLoading }) => {
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getCurrentUser();
        setUser(res.data);
      } catch (err) {
        console.error("Erro ao carregar usuário:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setUser, setLoading]);

  return null; // Não renderiza nada visivelmente
};

export default LoadUser;
