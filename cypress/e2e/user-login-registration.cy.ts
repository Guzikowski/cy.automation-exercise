import type { User } from '../support/types';

describe('User Login and Registration', () => {
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
  it('Test Case 1: Register User', () => {
    // Step 1: Visit the website
    cy.visit('https://automationexercise.com/');

    // Step 2: Click on 'Signup / Login' link
    cy.get('.shop-menu > .nav > :nth-child(4) > a').click();

    // Step 3: Verify the presence of the signup form
    cy.get('.signup-form > h2').should('contain', 'New User Signup!');

    // Step 4: Enter name and email in the signup form
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

    // Step 6: Verify account creation
    cy.contains('Account Created!').should('be.visible');
    cy.get('[data-qa="continue-button"]').click();
    cy.get('.shop-menu > .nav').should('contain', `Logged in as ${user.name}`);
    // Verify the account name is displayed
    cy.get(':nth-child(10) > a').contains(user.name);
  });

  it('Test Case 2: Login User with correct email and password', () => {
    cy.createAccount(user);
    // Log in with the correct email and password
    cy.login(user.email, user.password);
    // Verify that the user is logged in by checking the visibility of a specific element
    cy.get('.shop-menu > .nav > :nth-child(4) > a').should('be.visible');
  });
  it('Test Case 3: Login User with incorrect email and password', () => {
    cy.createAccount(user);
    // Log in with the correct email and password
    cy.login(user.email, 'wrong_password');
    // Verify error 'Your email or password is incorrect!' is visible
    cy.contains('Your email or password is incorrect!').should('be.visible');
  });
  it('Test Case 4: Logout User', () => {
    cy.createAccount(user);
    // Log in with the correct email and password
    cy.login(user.email, user.password);
    // Log out the user
    cy.logout();
    // Verify the presence of the login page
    cy.get('.login-form > h2').should('contain', 'Login to your account');
  });
  it('Test Case 5: Register User with existing email', () => {
    cy.createAccount(user);
    cy.visit('https://automationexercise.com/login');
    // Verify the presence of the signup form
    cy.get('.signup-form > h2').should('contain', 'New User Signup!');
    // Enter name and email in the signup form
    cy.get('[data-qa="signup-name"]').type(user.name);
    cy.get('[data-qa="signup-email"]').type(user.email);
    cy.get('[data-qa="signup-button"]').click();
    // Verify error 'Your email or password is incorrect!' is visible
    cy.contains('Email Address already exist!').should('be.visible');
  });

  it('Test Case 5a: Delete Account via UI', () => {
    cy.createAccount(user);
    // Log in with the correct email and password
    cy.login(user.email, user.password);

    cy.get('.shop-menu > .nav > li > a').then(($links) => {
      // Check if any of the links contain the text 'Delete Account'
      const deleteAccountLink = $links.toArray().find((link) => link.textContent?.trim() === 'Delete Account');

      if (deleteAccountLink) {
        // If the "Delete Account" link exists, click it
        cy.wrap(deleteAccountLink).click();
        cy.contains('Account Deleted!').should('be.visible');
        cy.get('[data-qa="continue-button"]').click();
      } else {
        // If the "Delete Account" link does not exist, log a message
        cy.log('Delete Account link not found in the navigation menu.');
      }
    });
  });
});
