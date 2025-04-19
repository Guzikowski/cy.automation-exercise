import type { User } from '../support/types';

describe('Search Product', () => {
  it('Test Case 9: Search Product', () => {
    // Step 1: Visit the website
    cy.visit('https://automationexercise.com/');
    cy.get('.shop-menu > .nav > :nth-child(2) > a').click();
    cy.get('.title').should('contain', 'All Products');
    cy.get('#search_product').type('Tshirt');
    cy.get('#submit_search').click();
    cy.get('.title').should('contain', 'Searched Products');
    cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').click();
    cy.get('.product-information > h2').should('contain', 'Men Tshirt');
    cy.get('.shop-menu > .nav > :nth-child(2) > a').click();
    cy.get('.features_items > .title').should('contain', 'All Products');
  });
});
