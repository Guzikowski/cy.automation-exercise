describe('User Login and Registration', () => {
    let user;
    before(() => {
        // Load user data from fixture
        cy.fixture('user').then((userData) => {
            user = userData;
        });
    });
    beforeEach(() => {
        // Register a new user before each test
        cy.registerUser(user);
    });
    afterEach(() => {
        // Delete the user account after each test
        cy.deleteAccount();
    });
    it('Test Case 1: Register User', () => {
        // Verify the account name is displayed
        cy.get(':nth-child(10) > a').contains(user.name);
    });
    it('Test Case 2: Login User with correct email and password', () => {
        // Log out the user
        cy.logout();
        // Log in with the correct email and password
        cy.login(user.email, user.password);
        // Verify that the user is logged in by checking the visibility of a specific element
        cy.get('.shop-menu > .nav > :nth-child(4) > a').should('be.visible');
    });
    it('Test Case 3: Login User with incorrect email and password', () => {
        // Log out the user
        cy.logout();
        // Log in with the correct email and password
        cy.login(user.email, 'wrong_password');
        // Verify error 'Your email or password is incorrect!' is visible
        cy.contains('Your email or password is incorrect!').should('be.visible');
        // Log in with the correct email and password
        cy.login(user.email, user.password);
        // Verify that the user is logged in by checking the visibility of a specific element
        cy.get('.shop-menu > .nav > :nth-child(4) > a').should('be.visible');
    });
    it('Test Case 4: Logout User', () => {
        // Log out the user
        cy.logout();
        // Verify the presence of the login page
        cy.get('.login-form > h2').should('contain', 'Login to your account');
        // Log in with the correct email and password
        cy.login(user.email, user.password);
        // Verify that the user is logged in by checking the visibility of a specific element
        cy.get('.shop-menu > .nav > :nth-child(4) > a').should('be.visible');
    });
    it('Test Case 5: Register User with existing email', () => {
        // Log out the user
        cy.logout();
        // Verify the presence of the signup form
        cy.get('.signup-form > h2').should('contain', 'New User Signup!');
        // Enter name and email in the signup form
        cy.get('[data-qa="signup-name"]').type(user.name);
        cy.get('[data-qa="signup-email"]').type(user.email);
        cy.get('[data-qa="signup-button"]').click();
        // Verify error 'Your email or password is incorrect!' is visible
        cy.contains('Email Address already exist!').should('be.visible');
    });
});
export {};
