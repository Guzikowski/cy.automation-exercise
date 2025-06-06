import type { User } from './types';

Cypress.Commands.add('logout', () => {
  // Add the steps to log out the user
  cy.get('.shop-menu > .nav > li > a').contains('Logout').click();
});

Cypress.Commands.add('createAccount', (user: User) => {
  // Prepare the form-urlencoded data
  const formData = [
    `name=${encodeURIComponent(`${user.name}`)}`,
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

  // Send the API request to create the account
  cy.request({
    method: 'POST',
    url: 'https://automationexercise.com/api/createAccount',
    body: formData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then((response) => {
    expect(response.status).to.eq(200);

    // Parse the response body as JSON
    const responseBody = JSON.parse(response.body);
    expect(responseBody.responseCode).to.eq(201);
    expect(responseBody.message).to.eq('User created!');
  });
});

Cypress.Commands.add('login', (email, password) => {
  // Add the steps to log in the user
  cy.visit('https://automationexercise.com/login');
  cy.get('[data-qa="login-email"]').clear().type(email);
  cy.get('[data-qa="login-password"]').clear().type(password, { log: false });
  cy.get('[data-qa="login-button"]').click();
});

Cypress.Commands.add('deleteAccountWhenLoginCreated', (user) => {
  // Prepare the form-urlencoded data
  const formData = `email=${encodeURIComponent(user.email)}&password=${encodeURIComponent(user.password)}`;

  // Verify if the user exists
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

    if (responseBody.responseCode === 200 && responseBody.message === 'User exists!') {
      cy.log('User exists. Proceeding to delete the account.');

      // Delete the account
      cy.request({
        method: 'DELETE',
        url: 'https://automationexercise.com/api/deleteAccount',
        body: formData,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then((deleteResponse) => {
        expect(deleteResponse.status).to.eq(200);

        // Parse the delete response body as JSON
        const deleteResponseBody = JSON.parse(deleteResponse.body);
        expect(deleteResponseBody.responseCode).to.eq(200);
        expect(deleteResponseBody.message).to.eq('Account deleted!');
      });
    } else {
      cy.log('User does not exist. Skipping account deletion.');
    }
  });
});
