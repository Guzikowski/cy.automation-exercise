import type { User } from '../support/types';

describe('Cart', () => {
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
  it('Test Case 12: Add Products to Cart', () => {
    // Step 1: Visit the website
    cy.visit('https://automationexercise.com/');
    cy.get('.productinfo > img').eq(0).realHover();
    cy.get('.overlay-content > .btn').eq(0).scrollIntoView().should('be.visible').click({ force: true });
    cy.get('.modal-footer > .btn').click();
    cy.get('.productinfo > img').eq(1).realHover();
    cy.get('.overlay-content > .btn').eq(1).should('be.visible').click({ force: true });
    cy.get('u').click();
    cy.get('#product-1 > .cart_description > h4 > a').should('have.text', 'Blue Top');
    cy.get('#product-1 > .cart_quantity > .disabled').should('have.text', '1');
    cy.get('#product-2 > .cart_description > h4 > a').should('have.text', 'Men Tshirt');
    cy.get('#product-2 > .cart_quantity > .disabled').should('have.text', '1');
    cy.get('.nav > :nth-child(1) > a').click();
    cy.get('.features_items > .title').should('contain', 'Features Items');
  });
  it('Test Case 13: Verify Quantity in Cart', () => {
    // Step 1: Visit the website
    cy.visit('https://automationexercise.com/');
    cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').click();
    cy.get('#quantity').clear().type('2');
    cy.get(':nth-child(5) > .btn').click();
    cy.get('.modal-footer > .btn').click();
    cy.get('.shop-menu > .nav > :nth-child(1) > a').click();
    cy.get('.features_items > .title').should('contain', 'Features Items');
    cy.get(':nth-child(4) > .product-image-wrapper > .choose > .nav > li > a').click();
    cy.get('#quantity').clear().type('2');
    cy.get(':nth-child(5) > .btn').click();
    cy.get('u').click();
    cy.get('#product-1 > .cart_description > h4 > a').should('have.text', 'Blue Top');
    cy.get('#product-1 > .cart_quantity > .disabled').should('have.text', '2');
    cy.get('#product-2 > .cart_description > h4 > a').should('have.text', 'Men Tshirt');
    cy.get('#product-2 > .cart_quantity > .disabled').should('have.text', '2');
    cy.get('.nav > :nth-child(1) > a').click();
    cy.get('.features_items > .title').should('contain', 'Features Items');
  });
  it('Test Case 17: Remove Product from Cart', () => {
    // Step 1: Visit the website
    cy.visit('https://automationexercise.com/');
    cy.get('.productinfo > img').eq(0).realHover();
    cy.get('.overlay-content > .btn').eq(0).scrollIntoView().should('be.visible').click({ force: true });
    cy.get('.modal-footer > .btn').click();
    cy.get('.productinfo > img').eq(1).realHover();
    cy.get('.overlay-content > .btn').eq(1).should('be.visible').click({ force: true });
    cy.get('u').click();
    cy.get('#product-1 > .cart_description > h4 > a').should('have.text', 'Blue Top');
    cy.get('#product-1 > .cart_quantity > .disabled').should('have.text', '1');
    cy.get('#product-2 > .cart_description > h4 > a').should('have.text', 'Men Tshirt');
    cy.get('#product-2 > .cart_quantity > .disabled').should('have.text', '1');
    cy.get('#product-1 > .cart_delete > .cart_quantity_delete > .fa').click();
    cy.get('#cart_items > :nth-child(1)').should('not.have.text', 'Blue Top');
    cy.get('.nav > :nth-child(1) > a').click();
    cy.get('.features_items > .title').should('contain', 'Features Items');
  });
  it('Test Case 20: Verify Cart after Login', () => {
    cy.createAccount(user);
    // Step 1: Visit the website
    cy.visit('https://automationexercise.com/');
    cy.get(':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a').click();
    cy.get('#quantity').clear().type('2');
    cy.get(':nth-child(5) > .btn').click();
    cy.get('.modal-footer > .btn').click();
    cy.get('.shop-menu > .nav > :nth-child(1) > a').click();
    cy.get('.features_items > .title').should('contain', 'Features Items');
    cy.get(':nth-child(4) > .product-image-wrapper > .choose > .nav > li > a').click();
    cy.get('#quantity').clear().type('2');
    cy.get(':nth-child(5) > .btn').click();
    cy.get('u').click();
    cy.get('#product-1 > .cart_description > h4 > a').should('have.text', 'Blue Top');
    cy.get('#product-1 > .cart_quantity > .disabled').should('have.text', '2');
    cy.get('#product-2 > .cart_description > h4 > a').should('have.text', 'Men Tshirt');
    cy.get('#product-2 > .cart_quantity > .disabled').should('have.text', '2');
    cy.get('.nav > :nth-child(1) > a').click();
    cy.get('.features_items > .title').should('contain', 'Features Items');
    cy.login(user.email, user.password);
    cy.get('.shop-menu > .nav > :nth-child(3) > a').click();
    cy.get('#product-1 > .cart_description > h4 > a').should('have.text', 'Blue Top');
    cy.get('#product-1 > .cart_quantity > .disabled').should('have.text', '2');
    cy.get('#product-2 > .cart_description > h4 > a').should('have.text', 'Men Tshirt');
    cy.get('#product-2 > .cart_quantity > .disabled').should('have.text', '2');
    cy.get('.nav > :nth-child(1) > a').click();
    cy.get('.features_items > .title').should('contain', 'Features Items');
  });
  it('Test Case 22: Add Recommended Item to Cart', () => {
    cy.visit('https://automationexercise.com/');
    cy.get('.active > :nth-child(3) > .product-image-wrapper > .single-products > .productinfo > .btn').click();
    cy.get('u').click();
    cy.get('h4 > a').should('have.text', 'Summer White Top');
    cy.get('.disabled').should('have.text', '1');
    cy.get('.nav > :nth-child(1) > a').click();
    cy.get('.features_items > .title').should('contain', 'Features Items');
  });
});
