declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to register a user.
     * @param user - The user object containing registration details.
     */
    createAccount(user: User): Chainable<void>;
    /**
     * Custom command to log out the user.
     */
    logout(): Chainable<void>;

    /**
     * Custom command to log in a user.
     * @param email - The user's email address.
     * @param password - The user's password.
     */
    login(email: string, password: string): Chainable<void>;
    /**
     * Custom command to delete a user account.
     */
    deleteAccountWhenLoginCreated(user: User): Chainable<void>;
  }
}
