import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const estaLogado = !!localStorage.getItem("token");

  function logout() {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event('storage'));
    navigate("/");
  }

  return (
    <header>
      <h2>Finanças</h2>
      <nav>
        <Link to="/home">Home</Link>
        
        {/* Mostra estas opções apenas quando logado */}
        {estaLogado && (
          <>
            <Link to="/transacoes">Transações</Link>
            <Link to="/nova-transacao">Nova</Link>
            <button onClick={logout}>Sair</button>
          </>
        )}
        
        {/* Mostra opções de login/cadastro quando não logado */}
        {!estaLogado && (
          <>
            <Link to="/login">Entrar</Link>
            <Link to="/cadastro">Cadastrar</Link>
          </>
        )}
      </nav>
    </header>
  );
}