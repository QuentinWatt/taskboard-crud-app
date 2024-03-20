describe('it has a login page', () => {
  const baseUrl = Cypress.config('baseUrl')

  it('Should redirect to /login if not authenticated', () => {
    cy.visit(baseUrl); 
    cy.url().should('include', '/login');
  });

  it('Should find a login page with email and password inputs', () => {
    cy.visit(`${baseUrl}login`); 

    cy.contains('h1', 'Login').should('exist');

    cy.get('input[id="email"]').should('exist');
    cy.get('input[id="password"]').should('exist');
  });

  it('Should return an error the wrong details are used.', () => {
    cy.visit(`${baseUrl}login`); 

    cy.get('input[id="email"]').type('user@123.test');
    cy.get('input[id="password"]').type('12345678');

    cy.get('form').submit();

    cy.debug()

    cy.contains('div', "We couldn't find an account with that email address.")
      .should('exist')
  });

  it('Should login and redirect to the home page', () => {
    const apiUrl = Cypress.env('apiUrl')
    const email = 'user@taskmaster.test';
    const password = 'password';

    cy.intercept('POST', '/api/auth/login').as('loginRequest');
    cy.visit(`${baseUrl}`); 

    cy.get('input[id="email"]').type(email);
    cy.get('input[id="password"]').type(password);

    cy.get('form').submit().then(() => {
      cy.wait('@loginRequest').then(({ request }) => {
        expect(request.url).to.equal(`${apiUrl}api/auth/login`)
    
        expect(request.body).to.include({
          email: email,
          password: password
        });
      });
    });

    cy.url().should('not.include', `${baseUrl}login`);
  });
})