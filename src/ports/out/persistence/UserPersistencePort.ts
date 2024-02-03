import { User } from '@domain/models/User';

export interface UserPersistencePort {
  save(user: User): Promise<User>;
  update(user: User): Promise<void>;
  findById(id: string): Promise<User>;
  findByUsernameOrEmail(usernameOrEmail: string): Promise<User>;
}

export const UserPersistencePort = Symbol('UserPersistencePort');
