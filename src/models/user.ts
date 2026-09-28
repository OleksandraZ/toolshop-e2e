export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
}

export type Credentials = Pick<Customer, 'email' | 'password'>;

export type UserRole = 'admin' | 'user';
