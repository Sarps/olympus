import { User } from "@domain/models/User";

export interface LoginPort {
  login(usernameOrEmail: String, password: String): Promise<User>;
}

export const LoginPort = Symbol("LoginPort")
