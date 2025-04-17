// src/contexts/AuthContext.jsx
import { createContext, useContext, useState } from "react";
import LoadUser from "../components/LoadUser"; // Certifique-se de que LoadUser.jsx está criado

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      <LoadUser setUser={setUser} setLoading={setLoading} />
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
