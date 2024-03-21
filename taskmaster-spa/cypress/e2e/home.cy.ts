describe('it has a home page with board data', () => {  
  const baseUrl = Cypress.config('baseUrl')
  const user = Cypress.env('defaultUser')

  it('Should redirect to /login if not authenticated', () => {
    cy.visit(baseUrl); 
    cy.url().should('include', '/login');
  });

  it('Should login and show the new boards form', () => {
    cy.login(user.email, user.password);
    cy.url().should('eq', baseUrl);

    cy.contains('h1', 'Your Boards')
      .should('exist');
    cy.get('form[data-cy="create-board-form"]')
      .should('exist');
    cy.contains('label', 'New board').should('exist');
    cy.get('input[id="board_name"]').should('exist');
  });

  it('Throws an error on a blank board', () => {
    cy.login(user.email, user.password);
    cy.url().should('eq', baseUrl);

    cy.get('form[data-cy="create-board-form"]')
      .should('exist');
    cy.get('input[id="board_name"]')
      .should('exist');

    cy.get('form[data-cy="create-board-form"]').submit().then((element) => {
      expect(element.html()).to.contain('span','The name field is required.');
    });    
  });

  it('Can create a new board', () => {
    cy.login(user.email, user.password);
    cy.url().should('eq', baseUrl);

    const testVal = String(Cypress._.random(0, 1e6))
    cy.get('input[id="board_name"]')
      .should('exist')
      .type(testVal);

    cy.get('form[data-cy="create-board-form"]').submit().then(() => {
      cy.get('div[data-cy="boards-list"]').should('exist');
    });
  });
})