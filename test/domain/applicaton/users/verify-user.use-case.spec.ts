import { It, Mock, Times } from 'moq.ts';
import { UserVerificationPersistencePort } from '@ports/out/persistence/user-verification.persistence.port';
import { UserPersistencePort } from '@ports/out/persistence/user.persistence.port';
import { UserVerifiedEventPort } from '@ports/out/events/user-verified.event.port';
import { VerifyUserUseCase } from '@domain/application/users/verify-user.use-case';
import { UserEntity } from '@domain/models/entities/user.entity';

describe('VerifyUserUseCase', () => {
  let userVerificationPersistence: Mock<UserVerificationPersistencePort>;
  let userPersistence: Mock<UserPersistencePort>;
  let userVerifiedEventPort: Mock<UserVerifiedEventPort>;
  let verifyUserUseCase: VerifyUserUseCase;

  const token = 'validToken';
  const userId = 'userId';
  const userEntity = new UserEntity(
    '1',
    'John Doe',
    'johnDoe',
    'john@example.com',
    'passwordHash',
    new Date(),
  );

  beforeEach(() => {
    userVerificationPersistence = new Mock<UserVerificationPersistencePort>();
    userPersistence = new Mock<UserPersistencePort>();
    userVerifiedEventPort = new Mock<UserVerifiedEventPort>();

    verifyUserUseCase = new VerifyUserUseCase(
      userVerificationPersistence.object(),
      userPersistence.object(),
      userVerifiedEventPort.object(),
    );
  });

  it('should verify user successfully with valid token or OTP', async () => {
    userVerificationPersistence
      .setup((i) => i.findUserIdByOtpOrToken(token))
      .returnsAsync(userId);
    userPersistence.setup((i) => i.findById(userId)).returnsAsync(userEntity);
    userPersistence.setup((i) => i.update(It.IsAny())).returnsAsync(undefined);
    userVerifiedEventPort
      .setup((i) => i.fire(It.IsAny()))
      .returnsAsync(undefined);

    const result = await verifyUserUseCase.verifyByTokenOrOtp(token);

    expect(result).toBe(true);
    userPersistence.verify(
      (i) =>
        i.update(It.Is<UserEntity>((user) => user.lastVerified !== undefined)),
      Times.Once(),
    );
    userVerifiedEventPort.verify((i) => i.fire(It.IsAny()), Times.Once());
  });

  it('should return false if verification fails', async () => {
    userVerificationPersistence
      .setup((i) => i.findUserIdByOtpOrToken('invalidToken'))
      .throws(new Error('Verification failed'));

    const result = await verifyUserUseCase.verifyByTokenOrOtp('invalidToken');

    expect(result).toBe(false);
  });

  it('should handle exceptions and return false', async () => {
    userVerificationPersistence
      .setup((i) => i.findUserIdByOtpOrToken(token))
      .throws(new Error('Unexpected error'));

    const result = await verifyUserUseCase.verifyByTokenOrOtp(token);

    expect(result).toBe(false);
  });
});
