import type { User } from '../support/types';

describe('Subscription', () => {
  let user: User;

  before(() => {
    // Load user data from fixture
    cy.fixture('user').then((userData) => {
      user = userData;
    });
  });

  it('Test Case 10: Verify Home Subscription', () => {
    // Step 1: Visit the website
    cy.visit('https://automationexercise.com/');
    cy.get('#susbscribe_email').type(user.email);
    cy.get('#subscribe').click();
    cy.get('.alert-success').should('contain', 'You have been successfully subscribed!');
  });
  it('Test Case 11: Verify Cart Subscription', () => {
    // Step 1: Visit the website
    cy.visit('https://automationexercise.com/');
    cy.get('.shop-menu > .nav > :nth-child(3) > a').click();
    cy.get('#susbscribe_email').type(user.email);
    cy.get('#subscribe').click();
    cy.get('.alert-success').should('contain', 'You have been successfully subscribed!');
    cy.get('.nav > :nth-child(1) > a').click();
    cy.get('.features_items > .title').should('contain', 'Features Items');
  });
});
