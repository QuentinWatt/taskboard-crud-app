describe('Manages tasks on the board', () => {
  before(() => {
    const {email, password} = Cypress.env('defaultUser')
    cy.login(email, password)
    
    for(let i=0; i<2; i++){
      cy.intercept('POST', '/api/board/new').as('createBoard');
      const testVal = String('New board: ' + Cypress._.random(0, 1e6))
      cy.get('input[id="board_name"]').should('exist').type(testVal);
      cy.get('form[data-cy="create-board-form"]').submit();
      cy.wait('@createBoard').then(() => {
        cy.get('[data-cy="boards-list"]').should('exist');
        cy.contains('h3[data-cy="board-title"]', testVal).should('exist')
      })
    }
  })

  beforeEach(() => {
    const {email, password} = Cypress.env('defaultUser')
    cy.login(email, password)
    cy.get('div[data-cy="board-card"]').should('exist').first().then((element) => {
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

    const testVal = String('Test task: '+ Cypress._.random(0, 1e6))
    cy.get('@addTaskForm').find('input[type="text"]').should('exist').type(testVal);
    cy.get('@addTaskForm').find('button[type="submit"]').should('exist').click();

    cy.wait('@createdTaskRequest').then((interception) => {
      expect(interception.response?.statusCode).to.eq(201)
      cy.get('div.task input[type="text"]').each(($input) => {
        cy.wrap($input).invoke('val').then((value) => {
          if (value === 'Test task ' + testVal) {
            cy.wrap($input).should('have.value', testVal);
          }
        });
      });
    })
  })

  it('Can edit a task input', () => {
    cy.url().should('match', /\/board\/\d+/);
    
    cy.get('div.task').first().should('exist').as('task')
    cy.get('@task').find('input[type="text"]').should('exist').as('taskInput');
    
    cy.intercept('PUT', /\/api\/board\/\d+\/task\/\d+/).as('taskPutRequest');
    const testVal = String('Edited task: ' + Cypress._.random(0, 1e6))
    cy.get('@taskInput').clear().type(testVal).blur();

    cy.wait('@taskPutRequest').then((interception) => {
      expect(interception.response?.statusCode).to.eq(200)
      cy.get('div.task input[type="text"]').each(($input) => {
        cy.wrap($input).invoke('val').then((value) => {
          if (value === 'Test task ' + testVal) {
            cy.wrap($input).should('have.value', testVal);
          }
        });
      });
    })
  })

  it('It can "complete" a task', () => {
    cy.url().should('match', /\/board\/\d+/);
    cy.get('div.task').first().should('exist').as('task')

    cy.intercept('PUT', /\/api\/board\/\d+\/task\/\d+/).as('taskPutRequest');
    cy.get('@task').find('input[type="checkbox"]').click();

    cy.wait('@taskPutRequest').then((interception) => {
      expect(interception.response?.statusCode).to.eq(200)
      cy.get('@task').should('have.class', 'bg-green-300')
    })
  })

  it('It can "uncomplete" a task', () => {
    cy.url().should('match', /\/board\/\d+/);
    cy.get('div.task.bg-green-300').first().should('exist').as('task')

    cy.intercept('PUT', /\/api\/board\/\d+\/task\/\d+/).as('taskPutRequest');
    cy.get('@task').find('input[type="checkbox"]').click();

    cy.wait('@taskPutRequest').then((interception) => {
      expect(interception.response?.statusCode).to.eq(200)
      cy.get('@task').should('not.have.class', 'bg-green-300')
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