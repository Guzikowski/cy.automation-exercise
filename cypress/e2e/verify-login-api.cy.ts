import type { User } from '../support/types';

describe('Verify Login API', () => {
  let user: User;

  before(() => {
    // Load user data from fixture
    cy.fixture('user').then((userData) => {
      user = userData;
    });
  });
  afterEach(() => {
    // Delete the user account after each test
    cy.deleteAccountWhenLoginCreated(user);
  });
  it('should verify login with valid credentials', () => {
    cy.createAccount(user);

    // Prepare the form-urlencoded data
    const formData = `email=${encodeURIComponent(user.email)}&password=${encodeURIComponent(user.password)}`;

    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/verifyLogin',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      // Parse the response body as JSON
      const responseBody = JSON.parse(response.body);
      expect(responseBody.responseCode).to.eq(200);
      expect(responseBody.message).to.eq('User exists!');
    });
  });
});
