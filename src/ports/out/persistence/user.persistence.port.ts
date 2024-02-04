import { UserEntity } from '@domain/models/entities/user.entity';

export interface UserPersistencePort {
  save(user: UserEntity): Promise<string>;
  update(user: UserEntity): Promise<void>;
  findById(id: string): Promise<UserEntity>;
  findByUsernameOrEmail(usernameOrEmail: string): Promise<UserEntity>;
}

export const UserPersistencePort = Symbol('UserPersistencePort');
