import { UserProfileUseCase } from '@domain/application/users/user-profile.use-case';
import { UserEntity } from '@domain/models/entities/user.entity';

describe('UserProfileUseCase', () => {
  let userProfileUseCase: UserProfileUseCase;

  beforeEach(() => {
    userProfileUseCase = new UserProfileUseCase();
  });

  it('should return the same user entity that is passed in', async () => {
    const userEntity = new UserEntity(
      '1',
      'John Doe',
      'johnDoe',
      'john@example.com',
      'hashedPassword',
    );

    const result = await userProfileUseCase.getUserProfile(userEntity);

    expect(result).toBe(userEntity);
  });
});
