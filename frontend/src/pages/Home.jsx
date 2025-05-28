import { useEffect, useState } from "react";
import api from "../services/api";
import "./Home.css";
import Header from "../components/Header";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { format, parseISO } from "date-fns";
import pt from "date-fns/locale/pt-BR";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Home() {
  const [saldo, setSaldo] = useState(0);
  const [receitas, setReceitas] = useState(0);
  const [despesas, setDespesas] = useState(0);
  const [grafico, setGrafico] = useState([]);
  const [transacoes, setTransacoes] = useState([]);

  useEffect(() => {
    async function carregarDados() {
      try {
        const res = await api.get("/transactions");
        const dados = res.data;

        const receitas = dados.filter(t => t.tipo === "receita").reduce((acc, t) => acc + t.valor, 0);
        const despesas = dados.filter(t => t.tipo === "despesa").reduce((acc, t) => acc + t.valor, 0);
        const saldo = receitas - despesas;

        const graficoDados = agruparPorMes(dados);

        setSaldo(saldo);
        setReceitas(receitas);
        setDespesas(despesas);
        setGrafico(graficoDados);
        setTransacoes(dados.slice(0, 5).reverse()); // Mostrar os 5 mais recentes
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }

    carregarDados();
  }, []);

  // Função para agrupar os dados do gráfico por mês
  function agruparPorMes(transacoes) {
    const resultado = {};

    transacoes.forEach(t => {
      const mes = format(parseISO(t.data), "MMM yyyy", { locale: pt });

      if (!resultado[mes]) {
        resultado[mes] = 0;
      }

      resultado[mes] += t.tipo === "receita" ? t.valor : -t.valor;
    });

    return Object.entries(resultado).map(([mes, valor]) => ({ mes, valor }));
  }

  const dadosGrafico = {
    labels: grafico.map(g => g.mes),
    datasets: [
      {
        label: "Fluxo de Caixa",
        data: grafico.map(g => g.valor),
        backgroundColor: "#3b82f6",
        borderRadius: 6,
      },
    ],
  };

  const opcoesGrafico = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true }
    },
  };

  return (
    <div className="dashboard-container">
      <Header />

      <main className="conteudo">
        <section className="intro">
          <h1>Gerencie suas finanças com facilidade</h1>
          <p>Monitore suas receitas e despesas, visualize seu saldo e acompanhe seu fluxo de caixa.</p>
          <button>Comece agora</button>
        </section>

        <section className="painel">
          <div className="box-saldo">
            <h3>Saldo Atual</h3>
            <p className="valor">
              R$ {saldo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className="box-resumo">
            <p className="receita">Receitas <strong>R$ {receitas.toLocaleString("pt-BR")}</strong></p>
            <p className="despesa">Despesas <strong>R$ {despesas.toLocaleString("pt-BR")}</strong></p>
          </div>

          <div className="box-grafico">
            <h4>Fluxo de Caixa</h4>
            <Bar data={dadosGrafico} options={opcoesGrafico} />
          </div>

          <div className="box-transacoes">
            <h4>Últimas Transações</h4>
            <ul>
              {transacoes.map(t => (
                <li key={t._id}>
                  <span className={t.tipo === "receita" ? "bolinha-verde" : "bolinha-vermelha"}></span>
                  {t.categoria}
                  <small>{new Date(t.data).toLocaleDateString("pt-BR")}</small>
                  <strong>R$ {t.valor.toLocaleString("pt-BR")}</strong>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer>
        <p>Privacidade · Termos · Ajuda</p>
      </footer>
    </div>
  );
}
