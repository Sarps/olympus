import { User } from '@domain/models/User';

export interface UserProfilePort {
  getUserProfile(user: User): Promise<User>;
}

export const UserProfilePort = Symbol('UserProfilePort');
