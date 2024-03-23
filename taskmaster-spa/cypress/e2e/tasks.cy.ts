describe('Manages tasks on the board', () => {
  beforeEach(() => {
    const {email, password} = Cypress.env('defaultUser')
    cy.login(email, password)
  
    cy.get('div[data-cy="board-card"]').first().then((element) => {
      cy.wrap(element).find('a').click();
    })
  })

  it('Can visit a board page', () => {
    cy.url().should('match', /\/board\/\d+/);
    cy.get('h1').should('exist');
    cy.get('[data-cy="add-task-form"]').should('exist');
    cy.get('[data-cy="delete-board-form"]').should('exist');
  })

  it('Can create a task', () => {
    cy.url().should('match', /\/board\/\d+/);
    cy.intercept('POST', /api\/board\/\d+\/task\/new/).as('createdTaskRequest');

    cy.get('[data-cy="add-task-form"]').as('addTaskForm');

    const testVal = String(Cypress._.random(0, 1e6))
    cy.get('@addTaskForm').find('input[type="text"]').should('exist').type('Test task ' + testVal);
    cy.get('@addTaskForm').find('button[type="submit"]').should('exist').click();

    cy.wait('@createdTaskRequest').then((interception) => {
      expect(interception.response?.statusCode).to.eq(201)
      cy.get('div.task input[type="text"]').each(($input) => {
        cy.wrap($input).invoke('val').then((value) => {
          if (value === 'Test task ' + testVal) {
            cy.wrap($input).should('have.value', 'Test task ' + testVal);
          }
        });
      });
    })
  })

  it('Can delete a task', () => {
    cy.url().should('match', /\/board\/\d+/);

    cy.get('div.task').first().should('exist').as('task')
    cy.get('@task').find('button').click();
    cy.get('@task').should('not.exist')
  })

  it('Can delete a board', () => {
    cy.url().should('match', /\/board\/\d+/);
    cy.get('form[data-cy="delete-board-form"]').should('exist')

    cy.get('form[data-cy="delete-board-form"] button[type="submit"]')
      .should('exist')
      .then($deleteButton => {
      expect($deleteButton.html()).to.contain('Delete Board');

      cy.wrap($deleteButton).click().then(() => {
        cy.url().should('not.match', /\/board\/\d+/)
        cy.url().should('eq', Cypress.config('baseUrl'))
      })
    });
  })
})