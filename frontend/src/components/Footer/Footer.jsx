// src/components/Footer.jsx
import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Institucional</h4>
          <ul>
            <li><Link to="/sobre">Sobre o Sistema</Link></li>
            <li><Link to="/equipe">Equipe</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Ajuda</h4>
          <ul>
            <li><Link to="/faq">Perguntas Frequentes</Link></li>
            <li><Link to="/contato">Fale Conosco</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/termos">Termos de Uso</Link></li>
            <li><Link to="/privacidade">Privacidade</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-copy">
        <p>&copy; 2025 Sistema de Controle de Finanças — Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

/* src/components/Footer.css */