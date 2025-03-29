export interface User {
  name: string;
  email: string;
  password: string;
  birthDate: {
    day: string;
    month: string;
    year: string;
  };
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
}
