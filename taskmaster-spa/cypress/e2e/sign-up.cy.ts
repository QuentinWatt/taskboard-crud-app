describe('It has a sign-up page', () => {
  const baseUrl: string = Cypress.config('baseUrl') ?? ''

  it('It has the correct h1 and sign up form', () => {
    cy.visit(`${baseUrl}sign-up`); 
    cy.url().should('eq', `${baseUrl}sign-up`)

    cy.get('h1').should('exist').then((element) => {
      expect(element.html()).to.contain('Sign Up')
    });
    cy.get('form[data-cy="sign-up-form"]')
      .should('exist');
  });
})