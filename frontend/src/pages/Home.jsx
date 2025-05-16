import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <header className="navbar">
        <div className="logo">Sistema de Controle de Finanças</div>
        <nav className="nav-links">
          <a href="#">Home</a>
          <a href="#">Sobre</a>
          <a href="#">Login</a>
          <a href="#">Cadastro</a>
        </nav>
      </header>

      <main className="main-content">
        <section className="left">
          <h1>Gerencie suas finanças com facilidade</h1>
          <p>
            Monitore suas receitas e despesas, visualize seu saldo e acompanhe seu fluxo de caixa.
          </p>
          <button className="start-button">Comece agora</button>
        </section>

        <section className="right">
          <div className="card">
            <h3>Saldo Atual</h3>
            <p className="saldo">R$ 12.500,00</p>
            <div className="receitas-despesas">
              <div className="receita">Receitas <span>R$ 25.000,00</span></div>
              <div className="despesa">Despesas <span>R$ 12.500,00</span></div>
            </div>

            <div className="grafico">
              <p>Fluxo de Caixa</p>
              <div className="barras">
                {['jan','fev','mar','abr','mai','mal'].map((mes, i) => (
                  <div key={i} className="barra">
                    <div className="altura" style={{ height: `${20 + i * 10}px` }}></div>
                    <span>{mes}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="transacoes">
              <p>Últimas Transações</p>
              <div className="linha">
                <span className="bolinha verde"></span>
                <span>Salário</span>
                <span className="data">09/09/2023</span>
                <span className="valor">R$ 5.000,00</span>
              </div>
              <div className="linha">
                <span className="bolinha vermelha"></span>
                <span>Alimentação</span>
                <span className="data">02/08/2024</span>
                <span className="valor">R$ 5.000,00</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <a href="#">Privacidade</a>
        <a href="#">Termos</a>
        <a href="#">Ajuda</a>
      </footer>
    </div>
  );
};

export default Home;
