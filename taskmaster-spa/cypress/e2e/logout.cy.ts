describe('A user can logout', () => {
  beforeEach(() => {
    const {email, password} = Cypress.env('defaultUser');
    cy.login(email, password)
  })

  it('Can logout', () => {
    cy.visit('/')

    cy.get('form[data-cy="logout-form"]').should('exist')
    cy.get('button[data-cy="logout-button"]').should('exist').then((element) => {
      cy.wrap(element).click()
    })

    cy.url().should('include', '/login')
  })
})