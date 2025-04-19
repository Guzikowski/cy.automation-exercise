import type { User } from '../support/types';

describe('Product', () => {
  let user: User;

  before(() => {
    // Load user data from fixture
    cy.fixture('user').then((userData) => {
      user = userData;
    });
  });
  it('Test Case 8: Verify All Products to Product Details', () => {
    // Step 1: Visit the website
    cy.visit('https://automationexercise.com/');
    cy.get('.shop-menu > .nav > :nth-child(2) > a').click();
    cy.get('.title').should('contain', 'All Products');
    cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').click();
    cy.get('.product-information > h2').should('contain', 'Blue Top');
    cy.get('.shop-menu > .nav > :nth-child(2) > a').click();
    cy.get('.features_items > .title').should('contain', 'All Products');
  });
  it('Test Case 18: View Category Products', () => {
    // Step 1: Visit the website
    cy.visit('https://automationexercise.com/');
    cy.get(':nth-child(1) > .panel-heading > .panel-title > a > .badge > .fa').click();
    cy.get('#Women > .panel-body > ul > :nth-child(1) > a').click();
    cy.get('.title').should('contain', 'Women - Dress Products');
    cy.get('.shop-menu > .nav > :nth-child(1) > a').click();
    cy.get('.features_items > .title').should('contain', 'Features Items');
  });
  it('Test Case 19: View Brand Products', () => {
    // Step 1: Visit the website
    cy.visit('https://automationexercise.com/');
    cy.get('.brands-name > .nav > :nth-child(1) > a').click();
    cy.get('.title').should('contain', 'Brand - Polo Products');
    cy.get('.shop-menu > .nav > :nth-child(1) > a').click();
    cy.get('.features_items > .title').should('contain', 'Features Items');
  });
  it('Test Case 21: Add Review in Product', () => {
    // Step 1: Visit the website
    cy.visit('https://automationexercise.com/');
    cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').click();
    cy.get('#name').type(user.name);
    cy.get('#email').type(user.email);
    cy.get('#review').type('This is a test review.');
    cy.get('#button-review').click();
    cy.get('.shop-menu > .nav > :nth-child(1) > a').click();
    cy.get('.features_items > .title').should('contain', 'Features Items');
  });
});
