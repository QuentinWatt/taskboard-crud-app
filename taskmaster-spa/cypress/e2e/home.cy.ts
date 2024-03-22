const baseUrl:string = Cypress.config('baseUrl') ?? ''
const user = Cypress.env('defaultUser')

describe('It behaves correctly when logged out', () => {
  it('Should redirect to /login if not authenticated', () => {
    cy.visit(baseUrl); 
    cy.url().should('include', '/login');
  });
})

describe('It has a home page with board data', () => { 
  beforeEach(() => {
    cy.login(user.email, user.password);
    cy.visit('/')
  })
  
  it('Should login and show the new boards form', () => {
    cy.contains('h1', 'Your Boards').should('exist');
    cy.get('form[data-cy="create-board-form"]').should('exist');
    cy.contains('label', 'New board').should('exist');
    cy.get('input[id="board_name"]').should('exist');
  });

  it('It throws an error on a blank submission', () => {
    cy.intercept('POST', '/api/board/new').as('createBoard');

    cy.get('form[data-cy="create-board-form"]').should('exist');
    cy.get('input[id="board_name"]').should('exist');

    cy.get('form[data-cy="create-board-form"]').submit();
    
    cy.wait('@createBoard').then(() => {
      cy.get('form[data-cy="create-board-form"]').should('exist').then((element) => {
        expect(element.html()).contains('div', 'The name field is required.')
        expect(element.html()).contains('span', 'The name field is required.')
      })
    })
  });

  it('Can create a new board', () => {
    cy.intercept('POST', '/api/board/new').as('createBoard');

    const testVal = String(Cypress._.random(0, 1e6))
    cy.get('input[id="board_name"]').should('exist').type(testVal);

    cy.get('form[data-cy="create-board-form"]').submit();

    cy.wait('@createBoard').then(() => {
      cy.get('[data-cy="boards-list"]').should('exist');

      cy.contains('h3[data-cy="board-title"]', testVal).should('exist')
      cy.get('h3[data-cy="board-title"]').first().then((element) => {
        expect(element.html()).contains(testVal)
        expect(element.parent().html()).contains('a', 'view')
      })
    })
  });

  it('Links to the board page', () => {
    cy.get('[data-cy="boards-list"]').should('exist');

    cy.get('div[data-cy="board-card"]').first().then((element) => {
      cy.wrap(element).find('a').click();
    })

    cy.url().should('not.equal', 'http://localhost:8081/')
  })
})