describe('it has a home page with board data', () => {  
  it('Should redirect to /login if not authenticated', () => {
    cy.visit('http://localhost:8081/'); 
    cy.url().should('include', '/login');
  });

  it('Should login and show the new boards form', () => {
    cy.login('user@taskmaster.test', 'password');
    cy.url().should('eq', 'http://localhost:8081/');

    cy.contains('h1', 'Your Boards')
      .should('exist');
    cy.get('form[data-cy="create-board-form"]')
      .should('exist');
    cy.contains('label', 'New board').should('exist');
    cy.get('input[id="board_name"]').should('exist');
  });

  it('Throws an error on a blank board', () => {
    cy.login('user@taskmaster.test', 'password');
    cy.url().should('eq', 'http://localhost:8081/');

    cy.get('form[data-cy="create-board-form"]')
      .should('exist');
    cy.get('input[id="board_name"]')
      .should('exist');

    cy.get('form[data-cy="create-board-form"]').submit().then((element) => {
      expect(element.html()).to.contain('span','The name field is required.');
    });    
  });

  it('Can create a new board', () => {
    cy.login('user@taskmaster.test', 'password');
    cy.url().should('eq', 'http://localhost:8081/');

    cy.get('input[id="board_name"]')
      .should('exist')
      .type('my new board');

    cy.get('form[data-cy="create-board-form"]').submit().then(() => {
      cy.contains('h3[data-cy="board-title"]', 'my new board')
        .should('exist');
    });
  });
})