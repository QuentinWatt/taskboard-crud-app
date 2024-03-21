describe('it can reach the back end', () => {
  const apiUrl = import.meta.env.VITE_APP_API_URL
  const {email, password} = Cypress.env('defaultUser');

  it('can make a request to the laravel app.', () => {
    cy.request(`${apiUrl}api/test`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('message', 'up');
    })
  })

  it('can make login request to the api.', () => {
    cy.request({
      method: "POST",
      url: `${apiUrl}api/auth/login`,
      body: {
        email,
        password,
      },
      headers:{
        "accept": 'appliction/json',
        "content-type": 'application/json'
      }
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.data).to.have.property('token');
      expect(response.body.data).to.have.property('user');
    })
  })
})