
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../../src/App';
import { BrowserRouter } from 'react-router-dom';

describe('Fluxo de Autenticação', () => {
  it('deve preencher o login e clicar no botão', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );

    const emailInput = screen.getByPlaceholderText(/e-mail/i);
    const senhaInput = screen.getByPlaceholderText(/senha/i);
    const button = screen.getByRole('button', { name: /entrar/i });

    fireEvent.change(emailInput, { target: { value: 'teste@email.com' } });
    fireEvent.change(senhaInput, { target: { value: '123456' } });
    fireEvent.click(button);

    expect(emailInput.value).toBe('teste@email.com');
    expect(senhaInput.value).toBe('123456');
  });
});
