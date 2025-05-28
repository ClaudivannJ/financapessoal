import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Header from "../components/Header";
import "./NewTransaction.css";

export default function NewTransaction() {
  const [tipo, setTipo] = useState("receita");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descricao, setDescricao] = useState("");
  const [data, setData] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/transactions", { tipo, valor, categoria, descricao, data });
      navigate("/transacoes");
    } catch {
      alert("Erro ao salvar");
    }
  }

  return (
    <div>
      <Header />
      <h2>Nova Transação</h2>
      <form onSubmit={handleSubmit}>
        <select value={tipo} onChange={e => setTipo(e.target.value)}>
          <option value="receita">Receita</option>
          <option value="despesa">Despesa</option>
        </select>
        <input placeholder="Valor" value={valor} onChange={e => setValor(e.target.value)} />
        <input placeholder="Categoria" value={categoria} onChange={e => setCategoria(e.target.value)} />
        <input placeholder="Descrição" value={descricao} onChange={e => setDescricao(e.target.value)} />
        <input type="date" value={data} onChange={e => setData(e.target.value)} />
        <button>Salvar</button>
      </form>
    </div>
  );
}
