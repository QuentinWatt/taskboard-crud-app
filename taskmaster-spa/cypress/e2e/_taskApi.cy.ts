describe('it can reach the back end', () => {
  const apiUrl = Cypress.env('apiUrl')

  it('can visit the laravel app', () => {
    cy.request(`${apiUrl}api/test`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('message', 'up');
    })
  })

  it('can visit the laravel app', () => {
    cy.visit(apiUrl).then(() => {
      cy.contains('h2', 'Documentation').should('exist');
    });
  })
})