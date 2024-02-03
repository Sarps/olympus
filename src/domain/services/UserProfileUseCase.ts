import { UserProfilePort } from '@ports/in/users/UserProfilePort';
import { User } from '@domain/models/User';

export class UserProfileUseCase implements UserProfilePort {
  async getUserProfile(user: User): Promise<User> {
    return user;
  }
}
