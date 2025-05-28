import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
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
    } catch(error) {
      console.log(error.response?.data || error.message);
      alert("Erro no cadastro");
    }
  }

  return (
    <form onSubmit={handleRegister}>
      <h2>Cadastro</h2>
      <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
      <input placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
      <input placeholder="Senha" type="password" value={senha} onChange={e => setSenha(e.target.value)} />
      <button>Cadastrar</button>
      <p>Já tem conta? <Link to="/">Faça login</Link></p>
    </form>
  );
}
