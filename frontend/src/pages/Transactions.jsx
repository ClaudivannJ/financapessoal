import { useEffect, useState } from "react";
import api from "../services/api.js";
import Header from "../components/Header.jsx";
import { Link } from "react-router-dom";
import "./Transaction.css";

export default function Transactions() {
  const [transacoes, setTransacoes] = useState([]);

  useEffect(() => {
    api.get("/transactions").then(res => setTransacoes(res.data));
  }, []);

  return (
    <>
      <Header />
      <div className="transacoes-container">
        <div className="transacoes-header">
          <h1>Minhas Transações</h1>
          <Link className="botao-nova" to="/nova-transacao">
            Nova Transação
          </Link>
        </div>

        <table className="tabela-transacoes">
          <thead>
            <tr>
              <th>Tipo</th>
              <th>Categoria</th>
              <th>Descrição</th>
              <th>Data</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {transacoes.map(t => (
              <tr key={t._id}>
                <td>
                  <span
                    className={t.tipo === "receita" ? "bolinha-verde" : "bolinha-vermelha"}
                  ></span>{" "}
                  {t.tipo.charAt(0).toUpperCase() + t.tipo.slice(1)}
                </td>
                <td>{t.categoria}</td>
                <td>{t.descricao || "-"}</td>
                <td>{new Date(t.data).toLocaleDateString("pt-BR")}</td>
                <td>R$ {t.valor.toLocaleString("pt-BR")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}