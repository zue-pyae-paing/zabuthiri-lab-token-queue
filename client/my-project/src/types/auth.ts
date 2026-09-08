export type UserRole = "admin" | "staff";

export interface User {
  _id: string;
  username: string;
  role: UserRole;
}

export interface LoginResponse {
  token: string;
  user: User;
}