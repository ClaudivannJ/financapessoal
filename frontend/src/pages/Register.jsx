import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api.js";
import "./Login.css";

export default function Register() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    try {
      await api.post("/auth/register", { nome, email, senha });
      navigate("/");
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Erro no cadastro");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Cadastro</h1>
        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome"
            value={nome}
            onChange={e => setNome(e.target.value)}
            required
          />
          <input
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            placeholder="Senha"
            type="password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required
          />
          <button>Cadastrar</button>
        </form>
        <p>
          Já tem conta? <Link to="/login">Faça login</Link>
        </p>
      </div>
    </div>
  );
}