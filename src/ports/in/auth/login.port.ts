import { UserEntity } from '@domain/models/entities/user.entity';

export interface LoginPort {
  login(usernameOrEmail: string, password: string): Promise<UserEntity>;
}

export const LoginPort = Symbol('LoginPort');
