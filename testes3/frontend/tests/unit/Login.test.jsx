
import { render, screen } from '@testing-library/react';
import Login from '../../src/pages/Login';
import { BrowserRouter } from 'react-router-dom';

describe('Login Page', () => {
  it('deve renderizar o formulário de login', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/e-mail/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
  });
});
