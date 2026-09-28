import 'dotenv/config'; // loads variables from .env into process.env

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable ${name}. Copy .env.example to .env and fill it in.`);
  }
  return value; // TS now knows this is `string`, not `string | undefined`
}

export const env = Object.freeze({
  baseUrl: process.env.BASE_URL ?? 'https://practicesoftwaretesting.com',
  apiUrl: process.env.API_URL ?? 'https://api.practicesoftwaretesting.com',
  customer: {
    email: required('CUSTOMER_EMAIL'),
    password: required('CUSTOMER_PASSWORD'),
  },
  admin: {
    email: required('ADMIN_EMAIL'),
    password: required('ADMIN_PASSWORD'),
  },
} as const);
