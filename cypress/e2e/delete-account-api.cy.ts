import type { User } from '../support/types';

describe('Delete Account API', () => {
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
  it('should delete the user account via API', () => {
    // Register a new user before test
    cy.createAccount(user);

    // Prepare the form-urlencoded data
    const formData = `email=${encodeURIComponent(user.email)}&password=${encodeURIComponent(user.password)}`;

    cy.request({
      method: 'DELETE',
      url: 'https://automationexercise.com/api/deleteAccount',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      // Parse the response body as JSON
      const responseBody = JSON.parse(response.body);
      expect(responseBody.responseCode).to.eq(200);
      expect(responseBody.message).to.eq('Account deleted!');
    });
  });
});
