// src/pages/Home.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Bem-vindo à Plataforma SaaS</h1>
      <button onClick={() => navigate("/login")} style={{ margin: "10px" }}>
        Login
      </button>
      <button onClick={() => navigate("/register")} style={{ margin: "10px" }}>
        Registrar
      </button>
    </div>
  );
}
