import { useEffect, useState } from "react";
import api from "../services/api";
import "./Home.css";
import Header from "../components/Header";
import Footer from "../components/Footer/Footer";
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
import { useNavigate } from "react-router-dom";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function Home() {
  const navigate = useNavigate();
  const [estaLogado, setEstaLogado] = useState(!!localStorage.getItem("token"));
  const [dadosCarregados, setDadosCarregados] = useState(false);

  // Estados para dados reais
  const [saldo, setSaldo] = useState(0);
  const [receitas, setReceitas] = useState(0);
  const [despesas, setDespesas] = useState(0);
  const [grafico, setGrafico] = useState([]);
  const [transacoes, setTransacoes] = useState([]);
  const [loading, setLoading] = useState(false);

  // Dados fictícios para demonstração
  const dadosDemonstracao = {
    saldo: 2500,
    receitas: 5000,
    despesas: 2500,
    grafico: [
      { mes: "Jan 2023", valor: 1500 },
      { mes: "Fev 2023", valor: 2500 },
      { mes: "Mar 2023", valor: 3500 },
    ],
    transacoes: [
      {
        _id: "1",
        tipo: "receita",
        valor: 2000,
        categoria: "Salário",
        data: "2023-03-01"
      },
      {
        _id: "2",
        tipo: "despesa",
        valor: 500,
        categoria: "Aluguel",
        data: "2023-03-05"
      }
    ]
  };

  // Função para limpar todos os dados do usuário
  const limparDadosUsuario = () => {
    setSaldo(0);
    setReceitas(0);
    setDespesas(0);
    setGrafico([]);
    setTransacoes([]);
    setDadosCarregados(false);
  };

  function agruparPorMes(transacoes) {
    const resultado = {};
    
    transacoes.forEach(t => {
      const mes = format(parseISO(t.data), "MMM yyyy", { locale: pt });
      if (!resultado[mes]) resultado[mes] = 0;
      resultado[mes] += t.tipo === "receita" ? Number(t.valor) : -Number(t.valor);
    });

    return Object.entries(resultado).map(([mes, valor]) => ({ mes, valor }));
  }

  useEffect(() => {
    const verificarAutenticacao = () => {
      const token = localStorage.getItem("token");
      const novoEstado = !!token;
      
      if (estaLogado !== novoEstado) {
        setEstaLogado(novoEstado);
        if (!novoEstado) {
          limparDadosUsuario();
        }
      }
    };

    // Listener para mudanças no localStorage
    window.addEventListener('storage', verificarAutenticacao);
    
    // Verificar também ao montar o componente
    verificarAutenticacao();

    return () => {
      window.removeEventListener('storage', verificarAutenticacao);
    };
  }, [estaLogado]);

  useEffect(() => {
    let isMounted = true;

    const carregarDados = async () => {
      if (!estaLogado) {
        if (isMounted) {
          limparDadosUsuario();
        }
        return;
      }

      try {
        setLoading(true);
        const res = await api.get("/transactions");

        if (!isMounted) return;

        const dados = Array.isArray(res.data) ? res.data : [];
        const transacoesValidas = dados.filter(t => {
          const valor = Number(t.valor);
          return !isNaN(valor) && isFinite(valor);
        });

        const totalReceitas = transacoesValidas
          .filter(t => t.tipo === "receita")
          .reduce((acc, t) => acc + Number(t.valor), 0);

        const totalDespesas = transacoesValidas
          .filter(t => t.tipo === "despesa")
          .reduce((acc, t) => acc + Number(t.valor), 0);

        if (isMounted) {
          setTransacoes(transacoesValidas.slice(0, 5));
          setReceitas(totalReceitas);
          setDespesas(totalDespesas);
          setSaldo(totalReceitas - totalDespesas);
          setGrafico(agruparPorMes(transacoesValidas));
          setDadosCarregados(true);
          setLoading(false);
        }
      } catch (err) {
        console.error("Erro ao carregar dados:", err);
        if (isMounted) {
          setLoading(false);
          if (err.response?.status === 401) {
            localStorage.removeItem("token");
            setEstaLogado(false);
            limparDadosUsuario();
          }
        }
      }
    };

    // Só carrega dados se não estiverem carregados ainda
    if (estaLogado && !dadosCarregados) {
      carregarDados();
    }

    return () => {
      isMounted = false;
    };
  }, [estaLogado, dadosCarregados]);

  const dadosGrafico = {
    labels: estaLogado ? grafico.map(g => g.mes) : dadosDemonstracao.grafico.map(g => g.mes),
    datasets: [
      {
        label: "Fluxo de Caixa",
        data: estaLogado ? grafico.map(g => g.valor) : dadosDemonstracao.grafico.map(g => g.valor),
        backgroundColor: "#3b82f6",
        borderRadius: 6,
      },
    ],
  };

  const opcoesGrafico = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true } },
  };

  return (
    <div className="dashboard-container">
      <Header />

      <main className="conteudo">
        {!estaLogado ? (
          <>
            <section className="intro">
              <h1>Gerencie suas finanças com facilidade</h1>
              <p>Monitore suas receitas e despesas, visualize seu saldo e acompanhe seu fluxo de caixa.</p>
              <button onClick={() => navigate("/cadastro")}>Comece agora</button>
            </section>

            <section className="painel-demo">
              <div className="box-saldo">
                <h3>Demonstração</h3>
                <p className="valor">
                  R$ {dadosDemonstracao.saldo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                </p>
              </div>

              <div className="box-resumo">
                <p className="receita">
                  Receitas <strong>R$ {dadosDemonstracao.receitas.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong>
                </p>
                <p className="despesa">
                  Despesas <strong>R$ {dadosDemonstracao.despesas.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong>
                </p>
              </div>

              <div className="box-grafico">
                <h4>Fluxo de Caixa (Demonstração)</h4>
                <Bar data={dadosGrafico} options={opcoesGrafico} />
              </div>

              <div className="box-transacoes">
                <h4>Últimas Transações (Demonstração)</h4>
                <ul>
                  {dadosDemonstracao.transacoes.map(t => (
                    <li key={t._id}>
                      <span className={t.tipo === "receita" ? "bolinha-verde" : "bolinha-vermelha"}></span>
                      {t.categoria}
                      <small>{new Date(t.data).toLocaleDateString("pt-BR")}</small>
                      <strong>R$ {Number(t.valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </>
        ) : loading ? (
          <div className="loading">Carregando seus dados...</div>
        ) : (
          <section className="painel">
            <div className="box-saldo">
              <h3>Saldo Atual</h3>
              <p className="valor">
                R$ {saldo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div className="box-resumo">
              <p className="receita">
                Receitas <strong>R$ {receitas.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong>
              </p>
              <p className="despesa">
                Despesas <strong>R$ {despesas.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong>
              </p>
            </div>

            <div className="box-grafico">
              <h4>Seu Fluxo de Caixa</h4>
              {grafico.length > 0 ? (
                <Bar data={dadosGrafico} options={opcoesGrafico} />
              ) : (
                <p>Nenhum dado disponível para o gráfico</p>
              )}
            </div>

            <div className="box-transacoes">
              <h4>Suas Últimas Transações</h4>
              {transacoes.length > 0 ? (
                <ul>
                  {transacoes.map(t => (
                    <li key={t._id}>
                      <span className={t.tipo === "receita" ? "bolinha-verde" : "bolinha-vermelha"}></span>
                      {t.categoria}
                      <small>{new Date(t.data).toLocaleDateString("pt-BR")}</small>
                      <strong>R$ {Number(t.valor).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</strong>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Nenhuma transação recente</p>
              )}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}