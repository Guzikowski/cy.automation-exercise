import type { User } from '../support/types';

describe('Contact Us', () => {
  let user: User;

  before(() => {
    // Load user data from fixture
    cy.fixture('user').then((userData) => {
      user = userData;
    });
  });

  it('Test Case 6: Contact Us Form', () => {
    // Step 1: Visit the website
    cy.visit('https://automationexercise.com/');
    cy.get('.shop-menu > .nav > :nth-child(8) > a').click();
    cy.get('[data-qa="name"]').type(user.name);
    cy.get('[data-qa="email"]').type(user.email);
    cy.get('[data-qa="subject"]').type('Test Subject');
    cy.get('[data-qa="message"]').type('Test Message');
    cy.get(':nth-child(6) > .form-control').attachFile('../fixtures/images/logo.png'); // Attach a file
    cy.get('[data-qa="submit-button"]').click();
    cy.get('.status').should('contain', 'Success! Your details have been submitted successfully.');
    cy.get('#form-section > .btn').click();
    cy.get('.features_items > .title').should('contain', 'Features Items');
  });
});
