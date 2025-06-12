import "./Footer.css";
import { Link } from "react-router-dom";
import { FaBuilding, FaQuestionCircle, FaBalanceScale, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4><FaBuilding /> Institucional</h4>
          <ul>
            <li><Link to="/sobre">Sobre o Sistema</Link></li>
            <li><Link to="/equipe">Nossa Equipe</Link></li>
            <li><Link to="/roadmap">Roadmap</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4><FaQuestionCircle /> Ajuda</h4>
          <ul>
            <li><Link to="/faq">Perguntas Frequentes</Link></li>
            <li><Link to="/tutoriais">Tutoriais</Link></li>
            <li><Link to="/contato"><FaEnvelope /> Fale Conosco</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4><FaBalanceScale /> Legal</h4>
          <ul>
            <li><Link to="/termos">Termos de Uso</Link></li>
            <li><Link to="/privacidade">Política de Privacidade</Link></li>
            <li><Link to="/cookies">Política de Cookies</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Conecte-se</h4>
          <div className="social-links">
            <a href="https://github.com/ClaudivannJ/financapessoal.git" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
          </div>
          <p>Assine nossa newsletter:</p>
          <form className="newsletter-form">
            <input type="email" placeholder="Seu melhor e-mail" />
            <button type="submit">Assinar</button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-copy">
          <p>&copy; 2025 Sistema de Controle de Finanças — Todos os direitos reservados.</p>
          <p>CNPJ: 00.000.000/0000-00</p>
        </div>
        <div className="footer-links">
          <Link to="/mapa-do-site">Mapa do Site</Link>
          <span>|</span>
          <Link to="/acessibilidade">Acessibilidade</Link>
        </div>
      </div>
    </footer>
  );
}