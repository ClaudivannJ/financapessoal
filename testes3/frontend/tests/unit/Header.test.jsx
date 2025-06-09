
import { render, screen } from '@testing-library/react';
import Header from '../../src/components/Header';
import { BrowserRouter } from 'react-router-dom';

describe('Header', () => {
  it('deve renderizar o logo e os links', () => {
    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    expect(screen.getByText(/controle de finanças/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
  });
});
