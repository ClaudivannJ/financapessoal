import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Home from "./pages/Home.jsx";
import Transactions from "./pages/Transactions.jsx";
import NewTransaction from "./pages/NewTransaction.jsx";
import Termos from "./pages/Footer/Termos.jsx";
import Privacidade from "./pages/Footer/Privacidade.jsx";
import Faq from "./pages/Footer/Faq.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/transacoes" element={<Transactions />} />
        <Route path="/nova-transacao" element={<NewTransaction />} />
        <Route path="/termos" element={<Termos />} />
        <Route path="/privacidade" element={<Privacidade />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
