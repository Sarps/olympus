import { User } from '@domain/models/User';

export interface LoginPort {
  login(usernameOrEmail: string, password: string): Promise<User>;
}

export const LoginPort = Symbol('LoginPort');
