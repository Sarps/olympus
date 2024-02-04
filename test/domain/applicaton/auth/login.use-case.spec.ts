import { LoginUseCase } from '@domain/application/auth/login.use-case';
import { Mock } from 'moq.ts';
import { UserPersistencePort } from '@ports/out/persistence/user.persistence.port';
import { UserEntity } from '@domain/models/entities/user.entity';
const bcrypt = require('bcrypt');
describe('LoginUseCase', () => {
  let userPersistence: Mock<UserPersistencePort>;
  let underTest: LoginUseCase;

  const userEntity = new UserEntity(
    '1',
    'John Doe',
    'testUser',
    'test@example.com',
    'hashedPassword',
  );

  const password = 'password';

  beforeEach(() => {
    userPersistence = new Mock<UserPersistencePort>();
    underTest = new LoginUseCase(userPersistence.object());

    jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
  });

  it('should successfully login with valid username and password', async () => {
    userPersistence
      .setup((i) => i.findByUsernameOrEmail(userEntity.username))
      .returnsAsync(userEntity);

    const result = await underTest.login(userEntity.username, password);

    expect(result).toEqual(userEntity);
  });

  it('should successfully login with valid email and password', async () => {
    userPersistence
      .setup((i) => i.findByUsernameOrEmail(userEntity.email))
      .returnsAsync(userEntity);

    const result = await underTest.login(userEntity.email, password);

    expect(result).toEqual(userEntity);
  });

  it('should fail to login with an invalid password', async () => {
    const wrongPassword = 'wrongPassword';
    userPersistence
      .setup((i) => i.findByUsernameOrEmail(userEntity.username))
      .returnsAsync(userEntity);
    jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);

    const result = await underTest.login(userEntity.username, wrongPassword);

    expect(result).toBeNull();
  });

  it('should fail to login with a non-existent username/email', async () => {
    const nonExistentUser = 'nonExistentUser';
    userPersistence
      .setup((i) => i.findByUsernameOrEmail(nonExistentUser))
      .throwsAsync('No record found');

    const result = await underTest.login(nonExistentUser, password);

    expect(result).toBeNull();
  });

  it('should handle exceptions during user retrieval', async () => {
    userPersistence
      .setup((i) => i.findByUsernameOrEmail(userEntity.username))
      .throwsAsync(new Error('Failed retrieving user'));

    const result = await underTest.login(userEntity.username, password);

    expect(result).toBeNull();
  });
});
