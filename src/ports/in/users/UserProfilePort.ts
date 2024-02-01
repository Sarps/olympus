import { User } from '@domain/models/User';

export interface UserProfilePort {
  getUserProfile(): Promise<User>;
}
