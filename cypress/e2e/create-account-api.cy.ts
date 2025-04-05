import type { User } from '../support/types';

describe('Createunt API', () => {
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
  it('should create a new user account via API', () => {
    // Prepare the form-urlencoded data
    const formData = [
      `name=${encodeURIComponent(user.name)}`,
      `email=${encodeURIComponent(user.email)}`,
      `password=${encodeURIComponent(user.password)}`,
      `title=${encodeURIComponent(user.title)}`,
      `birth_date=${encodeURIComponent(user.birthDate.day)}`,
      `birth_month=${encodeURIComponent(user.birthDate.month)}`,
      `birth_year=${encodeURIComponent(user.birthDate.year)}`,
      `firstname=${encodeURIComponent(user.address.firstName)}`,
      `lastname=${encodeURIComponent(user.address.lastName)}`,
      `company=${encodeURIComponent(user.address.company)}`,
      `address1=${encodeURIComponent(user.address.address1)}`,
      `address2=${encodeURIComponent(user.address.address2)}`,
      `country=${encodeURIComponent(user.address.country)}`,
      `zipcode=${encodeURIComponent(user.address.zipcode)}`,
      `state=${encodeURIComponent(user.address.state)}`,
      `city=${encodeURIComponent(user.address.city)}`,
      `mobile_number=${encodeURIComponent(user.address.mobileNumber)}`
    ].join('&');

    // Send the API request
    cy.request({
      method: 'POST',
      url: 'https://automationexercise.com/api/createAccount',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      const responseBody = JSON.parse(response.body);
      expect(responseBody.responseCode).to.eq(201);
      expect(responseBody.message).to.eq('User created!');
    });
  });
});
