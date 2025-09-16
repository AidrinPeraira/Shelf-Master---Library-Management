/**
 * An enum is a perfect way to define a
 * fixed set of named constants.
 * This ensures we can only ever assign
 * 'librarian' or 'lender' to the role,
 * preventing typos and making the code more readable.
 */
export enum UserRole {
  LIBRARIAN = "librarian",
  LENDER = "lender",
}

export interface User {
  userId: string;
  name: string;
  email: string;
  role: UserRole;
  passwordHash: string;
}
