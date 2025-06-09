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
      await api.post("/transactions", {
        tipo,
        valor: Number(valor),
        categoria,
        descricao,
        data: new Date(data + 'T00:00:00').toISOString(),
      });
      navigate("/transacoes");
    } catch {
      alert("Erro ao salvar");
    }
  }

  return (
    <>
      <Header />
      <div className="form-transacao-container">
        <div className="form-transacao">
          <h1>Nova Transação</h1>
          <form onSubmit={handleSubmit}>
            <select value={tipo} onChange={e => setTipo(e.target.value)}>
              <option value="receita">Receita</option>
              <option value="despesa">Despesa</option>
            </select>
            <input
              placeholder="Valor"
              type="number"
              value={valor}
              onChange={e => setValor(e.target.value)}
              required
            />
            <select value={categoria} onChange={e => setCategoria(e.target.value)} required>
  <option value="">Selecione uma categoria</option>
  <option value="Salário">Salário</option>
  <option value="Aluguel">Aluguel</option>
  <option value="Alimentação">Alimentação</option>
  <option value="Transporte">Transporte</option>
  <option value="Educação">Educação</option>
  <option value="Lazer">Lazer</option>
  <option value="Outros">Outros</option>
</select>

            <input
              placeholder="Descrição"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
            />
            <input
              type="date"
              value={data}
              onChange={e => setData(e.target.value)}
              required
            />
            <button>Salvar</button>
          </form>
        </div>
      </div>
    </>
  );
}