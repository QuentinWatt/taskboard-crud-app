/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(username: string, password: string): Chainable<any>;
  }
}

Cypress.Commands.add('login', (username: string, password: string) => {
  cy.visit('http://localhost:8081/login');
  cy.get('input[id="email"]').type('user@taskmaster.test');
  cy.get('input[id="password"]').type('password');

  cy.get('form').submit();

  cy.url().should('not.eq', 'http://localhost:8081/');
});