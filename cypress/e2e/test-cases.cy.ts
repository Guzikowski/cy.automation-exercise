import type { User } from '../support/types';

describe('Test Cases', () => {
  it('Test Case 7: Test Cases Page', () => {
    // Step 1: Visit the website
    cy.visit('https://automationexercise.com/');
    cy.get('.shop-menu > .nav > :nth-child(5) > a').click();
    cy.get('b').should('contain', 'Test Cases');
    cy.get('.nav > :nth-child(1) > a').click();
    cy.get('.features_items > .title').should('contain', 'Features Items');
  });
});
