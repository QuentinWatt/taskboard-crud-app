describe('it can reach the back end', () => {
  const apiUrl = Cypress.env('apiUrl')

  it('can visit the laravel app', () => {
    cy.visit(apiUrl).then(() => {
      cy.contains('h2', 'Documentation').should('exist');
    });
  })
})