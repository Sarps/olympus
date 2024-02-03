import { User } from '@domain/models/User';

export interface UserPersistencePort {
  save(user: User): Promise<void>;
  update(user: User): Promise<void>;
  findById(id: string): Promise<User>;
  findByUsernameOrEmail(usernameOrEmail: string): Promise<User>;
}

export const UserPersistencePort = Symbol("UserPersistencePort")
