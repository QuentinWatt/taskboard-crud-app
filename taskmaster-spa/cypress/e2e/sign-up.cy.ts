describe('It has a sign-up page', () => {
  const baseUrl = Cypress.config('baseUrl')

  it('Should return an error the wrong details are used.', () => {
    cy.visit(`${baseUrl}signup`); 
    cy.url().should('eq', `${baseUrl}signup`)

    // cy.contains('h1', 'Sign Up').should('exist');
  });
})