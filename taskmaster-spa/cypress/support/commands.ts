/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(email: string, password: string): Chainable<any>;
    signUp(name: string, email: string, password: string): Chainable<any>;
  }
}

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.intercept('POST', '/api/auth/login').as('loginRequest');
  
  cy.visit(`${Cypress.config('baseUrl')}login`);
  cy.get('input[id="email"]').type(email);
  cy.get('input[id="password"]').type(password);

  cy.get('form').submit();

  cy.wait('@loginRequest').then(({ request }) => {
    expect(request).to.equal(true)
    expect(request.url).to.equal('http://localhost:8000/api/auth/login')

    expect(request.body).to.include({
      email: email,
      password: password
    });
  });

  cy.url().should('not.eq', `${Cypress.config('baseUrl')}login`);
});

Cypress.Commands.add("signUp", (name: string, email: string, password: string) => {
  cy.visit(`${Cypress.config('baseUrl')}signUp`);
    cy.get('input[id="name"]').type(name);
    cy.get('input[id="email"]').type(email);
    cy.get('input[id="password"]').type(password);
    cy.get('form').submit();
});