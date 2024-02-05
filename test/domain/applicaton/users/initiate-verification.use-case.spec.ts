import { It, Mock, Times } from 'moq.ts';
import { UserVerificationPersistencePort } from '@ports/out/persistence/user-verification.persistence.port';
import { InitiateVerificationUseCase } from '@domain/application/users/initiate-verification.use-case';
import { UserVerificationEntity } from '@domain/models/entities/user-verification.entity';
import { VerificationNotifierPort } from '@ports/out/notifications/verification-notifier.port';

jest.mock('otp-generator', () => ({
  generate: jest.fn().mockReturnValue('123456'),
}));

jest.mock('secure-random-string', () =>
  jest.fn().mockReturnValue('secureRandomToken'),
);

const secureRandom = require('secure-random-string');
const otp = require('otp-generator');

describe('InitiateVerificationUseCase', () => {
  let userVerificationPersistence: Mock<UserVerificationPersistencePort>;
  let verificationNotifier: Mock<VerificationNotifierPort>;
  let underTest: InitiateVerificationUseCase;

  const userId = 'userId';
  const email = 'email@example.com';

  beforeEach(() => {
    userVerificationPersistence = new Mock<UserVerificationPersistencePort>();
    verificationNotifier = new Mock<VerificationNotifierPort>();
    underTest = new InitiateVerificationUseCase(
      userVerificationPersistence.object(),
      verificationNotifier.object()
    );
  });

  it('should initiate verification by generating OTP and token, saving them, and sending an email', async () => {
    userVerificationPersistence
      .setup((i) => i.save(It.IsAny()))
      .returnsAsync(undefined);
    verificationNotifier
      .setup(i => i.notify(email, It.IsAny(), It.IsAny()))
      .returnsAsync()

    await underTest.initiateVerification(userId, email);

    expect(otp.generate).toHaveBeenCalledWith(6, {
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    expect(secureRandom).toHaveBeenCalledWith({ length: 32 });
    userVerificationPersistence.verify(
      (i) =>
        i.save(
          It.Is<UserVerificationEntity>(
            (entity) =>
              entity.otpCode === '123456' &&
              entity.linkToken === 'secureRandomToken' &&
              entity.userId === userId,
          ),
        ),
      Times.Once(),
    );
    verificationNotifier.verify(i => i.notify(email, '123456', 'secureRandomToken'))
  });
});
