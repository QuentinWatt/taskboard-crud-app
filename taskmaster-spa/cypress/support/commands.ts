/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(email: string, password: string): Chainable<any>;
    signUp(name: string, email: string, password: string): Chainable<any>;
  }
}

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit(`${Cypress.config('baseUrl')}login`);
  cy.get('input[id="email"]').type(email);
  cy.get('input[id="password"]').type(password);

  cy.get('form').submit();

  cy.intercept('POST', '/auth/token').as('axiosRequest');

  cy.url().should('not.eq', `${Cypress.config('baseUrl')}login`);
});

Cypress.Commands.add("signUp", (name: string, email: string, password: string) => {
  cy.visit(`${Cypress.config('baseUrl')}signUp`);
    cy.get('input[id="name"]').type(name);
    cy.get('input[id="email"]').type(email);
    cy.get('input[id="password"]').type(password);
    cy.get('form').submit();
});