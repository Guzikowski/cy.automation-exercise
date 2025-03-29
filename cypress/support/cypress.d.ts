declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to register a user.
     * @param user - The user object containing registration details.
     */
    registerUser(user: {
      name: string;
      email: string;
      password: string;
      birthDate: { day: string; month: string; year: string };
      address: {
        firstName: string;
        lastName: string;
        company: string;
        address1: string;
        address2: string;
        country: string;
        state: string;
        city: string;
        zipcode: string;
        mobileNumber: string;
      };
    }): Chainable<void>;
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
    deleteAccount(): Chainable<void>;
  }
}
