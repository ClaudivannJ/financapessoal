
describe('Gestão de Transações', () => {
  it('Deve fazer login, acessar transações e criar uma nova', () => {
    cy.visit('http://localhost:5173');

    cy.get('input[placeholder="E-mail"]').type('teste@email.com');
    cy.get('input[placeholder="Senha"]').type('123456');
    cy.contains('Entrar').click();

    cy.contains('Transações').click();

    cy.contains('Nova Transação').click();
    cy.get('input[placeholder="Valor"]').type('1000');
    cy.get('input[placeholder="Categoria"]').type('Salário');
    cy.get('input[placeholder="Descrição"]').type('Pagamento');
    cy.get('input[type="date"]').type('2024-07-21');

    cy.contains('Salvar').click();

    cy.contains('Salário').should('exist');
  });
});
