import './ContentPage.css';
import { Link } from 'react-router-dom'; 
import { FaQuestionCircle } from 'react-icons/fa';

export default function Faq() {
  return (
    <div className="content-page">
      <header className="page-header">
        <h1><FaQuestionCircle /> Perguntas Frequentes</h1>
        <p className="page-subtitle">Encontre respostas para as dúvidas mais comuns sobre nosso sistema</p>
      </header>
      
      <div className="content-section">
        <div className="faq-item">
          <h3 className="faq-question">1. O sistema é gratuito?</h3>
          <p className="faq-answer">Sim! Atualmente o sistema está disponível gratuitamente para uso pessoal. Oferecemos uma versão básica gratuita com todas as funcionalidades essenciais para gerenciamento financeiro pessoal.</p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">2. Meus dados estão seguros?</h3>
          <p className="faq-answer">Sim. Utilizamos as melhores práticas de segurança, incluindo:
            <ul>
              <li>Autenticação segura com JWT</li>
              <li>Criptografia de senhas com bcrypt</li>
              <li>Conexão protegida por HTTPS</li>
              <li>Backups diários dos dados</li>
            </ul>
          </p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">3. Posso excluir minhas informações?</h3>
          <p className="faq-answer">Sim. Você tem total controle sobre seus dados. Pode excluir transações individuais ou sua conta completa a qualquer momento nas configurações do sistema. Todos os dados são permanentemente removidos de nossos servidores.</p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">4. Onde posso falar com a equipe?</h3>
          <p className="faq-answer">Você pode entrar em contato através de:
            <ul>
              <li>Página "Fale Conosco" no rodapé do site</li>
              <li>E-mail: suporte@financas.com.br</li>
              <li>Chat online (disponível das 9h às 18h)</li>
            </ul>
            Nosso tempo médio de resposta é de 24 horas úteis.
          </p>
        </div>

        <div className="faq-item">
          <h3 className="faq-question">5. O sistema funciona em celular?</h3>
          <p className="faq-answer">Sim. Nosso sistema foi desenvolvido com mobile-first, sendo totalmente responsivo e otimizado para dispositivos móveis e tablets. Também oferecemos:</p>
          <ul>
            <li>Aplicativo para Android e iOS</li>
            <li>Funcionalidade offline limitada</li>
            <li>Sincronização automática entre dispositivos</li>
          </ul>
        </div>

        <div className="contact-promo">
          <p>Não encontrou sua resposta? <Link to="/contato" className="contact-link">Entre em contato conosco</Link> e nossa equipe terá prazer em ajudar.</p>
        </div>
      </div>
    </div>
  );
}