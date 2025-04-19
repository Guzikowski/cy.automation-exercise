import type { User } from '../support/types';

describe('Place Order', () => {
  let user: User;

  before(() => {
    // Load user data from fixture
    cy.fixture('user').then((userData: User) => {
      user = userData;
    });
  });

  afterEach(() => {
    // Delete the user account after each test
    cy.deleteAccountWhenLoginCreated(user);
  });

  it('Test Case 14: Register while Check out', () => {
    cy.visit('https://automationexercise.com/');
    cy.get('.productinfo > img').eq(0).realHover();
    cy.get('.overlay-content > .btn').eq(0).scrollIntoView().should('be.visible').click({ force: true });
    cy.get('u').click();
    cy.get('#product-1 > .cart_description > h4 > a').should('have.text', 'Blue Top');
    cy.get('#product-1 > .cart_quantity > .disabled').should('have.text', '1');
    cy.get('.col-sm-6 > .btn').click();
    cy.get('.modal-body > :nth-child(2) > a > u').click();
    cy.get('[data-qa="signup-name"]').type(user.name);
    cy.get('[data-qa="signup-email"]').type(user.email);
    cy.get('[data-qa="signup-button"]').click();
    // Step 5: Enter account information
    cy.get(':nth-child(1) > b').should('contain', 'Enter Account Information');
    cy.get('.clearfix > :nth-child(3)').click(); // Select the 'Mr.' radio button
    cy.get('#password').type(user.password, { log: false }); // Enter password
    cy.get('[data-qa="days"]').select(user.birthDate.day); // Select day of birth
    cy.get('[data-qa="months"]').select(user.birthDate.month); // Select month of birth
    cy.get('[data-qa="years"]').select(user.birthDate.year); // Select year of birth
    cy.get('#newsletter').click(); // Subscribe to the newsletter
    cy.get('#optin').click(); // Receive special offers
    cy.get('[data-qa="first_name"]').type(user.address.firstName); // Enter first name
    cy.get('[data-qa="last_name"]').type(user.address.lastName); // Enter last name
    cy.get('[data-qa="company"]').type(user.address.company); // Enter company name
    cy.get('[data-qa="address"]').type(user.address.address1); // Enter address
    cy.get('[data-qa="address2"]').type(user.address.address2); // Enter address line 2
    cy.get('[data-qa="country"]').select(user.address.country); // Select country
    cy.get('[data-qa="state"]').type(user.address.state); // Enter state
    cy.get('[data-qa="city"]').type(user.address.city); // Enter city
    cy.get('[data-qa="zipcode"]').type(user.address.zipcode); // Enter zip code
    cy.get('[data-qa="mobile_number"]').type(user.address.mobileNumber); // Enter mobile number
    cy.get('[data-qa="create-account"]').click(); // Click on 'Create Account' button
    cy.get('[data-qa="continue-button"]').click();
    cy.get('.shop-menu > .nav > :nth-child(3) > a').click();
    cy.get('.col-sm-6 > .btn').click();
    cy.get(':nth-child(7) > .btn').click();
    cy.get('[data-qa="name-on-card"]').type(user.name);
    cy.get('[data-qa="card-number"]').type('1234567890123456');
    cy.get('[data-qa="cvc"]').type('123');
    cy.get('[data-qa="expiry-month"]').type('12');
    cy.get('[data-qa="expiry-year"]').type('2025');
    cy.get('[data-qa="pay-button"]').click();
    cy.get('.col-sm-9 > p').should('contain', 'Congratulations! Your order has been confirmed!');
    cy.get('[data-qa="continue-button"]').click();
    cy.get('.features_items > .title').should('contain', 'Features Items');
  });
  it('Test Case 15: Register before Check out', () => {
    cy.createAccount(user);
    cy.visit('https://automationexercise.com/');
    cy.get('.productinfo > img').eq(0).realHover();
    cy.get('.overlay-content > .btn').eq(0).scrollIntoView().should('be.visible').click({ force: true });
    cy.get('u').click();
    cy.get('#product-1 > .cart_description > h4 > a').should('have.text', 'Blue Top');
    cy.get('#product-1 > .cart_quantity > .disabled').should('have.text', '1');
    cy.get('.col-sm-6 > .btn').click();
    cy.get('.modal-body > :nth-child(2) > a > u').click();
    cy.get('[data-qa="login-email"]').clear().type(user.email);
    cy.get('[data-qa="login-password"]').clear().type(user.password, { log: false });
    cy.get('[data-qa="login-button"]').click();
    cy.get('.shop-menu > .nav > :nth-child(3) > a').click();
    cy.get('.col-sm-6 > .btn').click();
    cy.get(':nth-child(7) > .btn').click();
    cy.get('[data-qa="name-on-card"]').type(user.name);
    cy.get('[data-qa="card-number"]').type('1234567890123456');
    cy.get('[data-qa="cvc"]').type('123');
    cy.get('[data-qa="expiry-month"]').type('12');
    cy.get('[data-qa="expiry-year"]').type('2025');
    cy.get('[data-qa="pay-button"]').click();
    cy.get('.col-sm-9 > p').should('contain', 'Congratulations! Your order has been confirmed!');
    cy.get('[data-qa="continue-button"]').click();
    cy.get('.features_items > .title').should('contain', 'Features Items');
  });
  it('Test Case 16: Login before Check out', () => {
    cy.createAccount(user);
    cy.login(user.email, user.password);
    cy.visit('https://automationexercise.com/');
    cy.get('.productinfo > img').eq(0).realHover();
    cy.get('.overlay-content > .btn').eq(0).scrollIntoView().should('be.visible').click({ force: true });
    cy.get('u').click();
    cy.get('#product-1 > .cart_description > h4 > a').should('have.text', 'Blue Top');
    cy.get('#product-1 > .cart_quantity > .disabled').should('have.text', '1');
    cy.get('.col-sm-6 > .btn').click();
    cy.get(':nth-child(7) > .btn').click();
    cy.get('[data-qa="name-on-card"]').type(user.name);
    cy.get('[data-qa="card-number"]').type('1234567890123456');
    cy.get('[data-qa="cvc"]').type('123');
    cy.get('[data-qa="expiry-month"]').type('12');
    cy.get('[data-qa="expiry-year"]').type('2025');
    cy.get('[data-qa="pay-button"]').click();
    cy.get('.col-sm-9 > p').should('contain', 'Congratulations! Your order has been confirmed!');
    cy.get('[data-qa="continue-button"]').click();
    cy.get('.features_items > .title').should('contain', 'Features Items');
  });
  it('Test Case 23: Verify Address on Check Out', () => {
    cy.log(JSON.stringify(user));
    cy.createAccount(user);
    cy.login(user.email, user.password);
    cy.visit('https://automationexercise.com/');
    cy.get('.productinfo > img').eq(0).realHover();
    cy.get('.overlay-content > .btn').eq(0).scrollIntoView().should('be.visible').click({ force: true });
    cy.get('u').click();
    cy.get('#product-1 > .cart_description > h4 > a').should('have.text', 'Blue Top');
    cy.get('#product-1 > .cart_quantity > .disabled').should('have.text', '1');
    cy.get('.col-sm-6 > .btn').click();
    cy.get('#address_delivery > :nth-child(4)').should('have.text', user.address.address1);
    cy.get('#address_invoice > :nth-child(4)').should('have.text', user.address.address1);
    cy.get(':nth-child(7) > .btn').click();
    cy.get('[data-qa="name-on-card"]').type(user.name);
    cy.get('[data-qa="card-number"]').type('1234567890123456');
    cy.get('[data-qa="cvc"]').type('123');
    cy.get('[data-qa="expiry-month"]').type('12');
    cy.get('[data-qa="expiry-year"]').type('2025');
    cy.get('[data-qa="pay-button"]').click();
    cy.get('.col-sm-9 > p').should('contain', 'Congratulations! Your order has been confirmed!');
    cy.get('[data-qa="continue-button"]').click();
    cy.get('.features_items > .title').should('contain', 'Features Items');
  });
  it('Test Case 24: Download Invoice', () => {
    cy.createAccount(user);
    cy.login(user.email, user.password);
    cy.visit('https://automationexercise.com/');
    cy.get('.productinfo > img').eq(0).realHover();
    cy.get('.overlay-content > .btn').eq(0).scrollIntoView().should('be.visible').click({ force: true });
    cy.get('u').click();
    cy.get('#product-1 > .cart_description > h4 > a').should('have.text', 'Blue Top');
    cy.get('#product-1 > .cart_quantity > .disabled').should('have.text', '1');
    cy.get('.col-sm-6 > .btn').click();
    cy.get(':nth-child(7) > .btn').click();
    cy.get('[data-qa="name-on-card"]').type(user.name);
    cy.get('[data-qa="card-number"]').type('1234567890123456');
    cy.get('[data-qa="cvc"]').type('123');
    cy.get('[data-qa="expiry-month"]').type('12');
    cy.get('[data-qa="expiry-year"]').type('2025');
    cy.get('[data-qa="pay-button"]').click();
    cy.get('.col-sm-9 > p').should('contain', 'Congratulations! Your order has been confirmed!');
    cy.get('.col-sm-9 > .btn-default').click();
    cy.get('[data-qa="continue-button"]').click();
    cy.get('.features_items > .title').should('contain', 'Features Items');
    const filePath = 'cypress/downloads/invoice.txt';
    cy.readFile(filePath).then((fileContent) => {
      expect(fileContent).to.contain('Hi John Doe, Your total purchase amount is 500. Thank you');
    });
  });
});
