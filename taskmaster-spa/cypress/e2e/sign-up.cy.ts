describe('It has a sign-up page', () => {
  const baseUrl = Cypress.config('baseUrl')

  it('It has the correct h1 and sign up form', () => {
    cy.visit(`${baseUrl}signup`); 
    cy.url().should('eq', `${baseUrl}signup`)
    cy.contains('h1', 'Sign Up').should('exist');
    cy.get('form[data-cy="sign-up-form"]')
      .should('exist');
  });
})