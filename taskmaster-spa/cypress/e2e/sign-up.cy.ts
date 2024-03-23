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

  it("User can sign up and login", () => {
    cy.get('a[href="/sign-up"]').click();
    cy.intercept("POST", `http://localhost:8000/api/auth/signup`).as(
      "signUpRequest"
    );

    const uniqueName = String("User " + Cypress._.random(0, 1e6));
    const uniqueEmail = String(
      "user+" + Cypress._.random(0, 1e6) + "@taskmaster.test"
    );
    cy.get('form[data-cy="sign-up-form"]');
    cy.get("#name").type(uniqueName).should("have.value", uniqueName);
    cy.get("#email").type(uniqueEmail).should("have.value", uniqueEmail);
    cy.get('input[type="password"]')
      .type("password")
      .should("have.value", "password");
    cy.get('form[data-cy="sign-up-form"]').submit();

    cy.wait("@signUpRequest").then((interception) => {
      expect(interception.response?.statusCode).to.eq(201);
      cy.url().should("eq", `${baseUrl}login`);
    });
    cy.login(uniqueEmail, "password");
    cy.url().should("eq", baseUrl);
  });
});
