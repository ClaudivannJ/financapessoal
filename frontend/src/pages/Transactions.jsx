import { useEffect, useState } from "react";
import api from "../services/api";
import Header from "../components/Header";
import "./Transaction.css";

export default function Transactions() {
  const [transacoes, setTransacoes] = useState([]);

  useEffect(() => {
    api.get("/transactions").then(res => setTransacoes(res.data));
  }, []);

  return (
    <div>
      <Header />
      <h2>Minhas Transações</h2>
      <ul>
        {transacoes.map(t => (
          <li key={t._id}>
            {t.tipo.toUpperCase()} | {t.categoria} | R$ {t.valor} | {new Date(t.data).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
