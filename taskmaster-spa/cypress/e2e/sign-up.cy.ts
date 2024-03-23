describe("It has a sign-up page", () => {
  const baseUrl = Cypress.config("baseUrl");

  beforeEach(() => {
    cy.visit(`${baseUrl}sign-up`);
  });

  it("It has the correct h1 and sign up form", () => {
    cy.url().should("eq", `${baseUrl}sign-up`);

    cy.get("h1")
      .should("exist")
      .then((element) => {
        expect(element.html()).to.contain("Sign Up");
      });

    cy.get('form[data-cy="sign-up-form"]').should("exist");
  });

  it("It has validation", () => {
    cy.get('form[data-cy="sign-up-form"]')
      .submit()
      .then((element) => {
        expect(element.html()).contains("p", "The name field is required.");
        expect(element.html()).contains("p", "The email field is required.");
        expect(element.html()).contains("p", "The password field is required.");
      });
  });
});
