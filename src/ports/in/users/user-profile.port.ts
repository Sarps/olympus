import { UserEntity } from '@domain/models/entities/user.entity';

export interface UserProfilePort {
  getUserProfile(user: UserEntity): Promise<UserEntity>;
}

export const UserProfilePort = Symbol('UserProfilePort');
