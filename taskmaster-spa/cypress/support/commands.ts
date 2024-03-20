/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(username: string, password: string): Chainable<any>;
  }
}

Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit(`${Cypress.config('baseUrl')}login`);
  cy.get('input[id="email"]').type(email);
  cy.get('input[id="password"]').type(password);

  cy.get('form').submit();

  cy.url().should('not.eq', `${Cypress.config('baseUrl')}login`);
});