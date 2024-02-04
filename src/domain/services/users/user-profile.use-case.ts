import { UserProfilePort } from '@ports/in/users/user-profile.port';
import { UserEntity } from '@domain/models/entities/user.entity';

export class UserProfileUseCase implements UserProfilePort {
  async getUserProfile(user: UserEntity): Promise<UserEntity> {
    return user;
  }
}
