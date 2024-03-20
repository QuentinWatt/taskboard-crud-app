describe('it has a login page', () => {
  it('Should redirect to /login if not authenticated', () => {
    cy.visit('http://localhost:8081/'); 
    cy.url().should('include', '/login');
  });

  it('Should find a login page with email and password inputs', () => {
    cy.visit('http://localhost:8081/login'); 

    cy.contains('h1', 'Login').should('exist');

    cy.get('input[id="email"]').should('exist');
    cy.get('input[id="password"]').should('exist');
  });

  it('Should return an error if the site', () => {
    cy.visit('http://localhost:8081/login'); 

    cy.get('input[id="email"]').type('user@123.test');
    cy.get('input[id="password"]').type('12345678');

    cy.get('form').submit();

    cy.contains('div', "We couldn't find an account with that email address.").should('exist')
  });

  it('Should login and redirect to the home page', () => {
    cy.visit('http://localhost:8081/'); 

    cy.get('input[id="email"]').type('user@taskmaster.test');
    cy.get('input[id="password"]').type('password');

    cy.get('form').submit();

    cy.url().should('not.include', 'http://localhost:8081/login');
  });
})