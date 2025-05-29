import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <header>
      <h2>Finanças</h2>
      <nav>
        <Link to="/home">Home</Link>
        <Link to="/transacoes">Transações</Link>
        <Link to="/nova-transacao">Nova</Link>
        <button onClick={logout}>Sair</button>
      </nav>
    </header>
  );
}
