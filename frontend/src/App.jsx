import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Transactions from "./pages/Transactions";
import NewTransaction from "./pages/NewTransaction";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/transacoes" element={<Transactions />} />
        <Route path="/nova-transacao" element={<NewTransaction />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
