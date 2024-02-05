import { InitiateUserVerificationPort } from '@ports/in/users/initiate-user-verification.port';
import secureRandom from 'secure-random-string';
import { VERIFY_URL } from '@infrastructure/constants';
import { UserVerificationPersistencePort } from '@ports/out/persistence/user-verification.persistence.port';
import { Inject } from '@nestjs/common';
import { UserVerificationEntity } from '@domain/models/entities/user-verification.entity';
import otp from 'otp-generator';
import { VerificationNotifierPort } from '@ports/out/notifications/verification-notifier.port';

export class InitiateVerificationUseCase
  implements InitiateUserVerificationPort
{
  constructor(
    @Inject(UserVerificationPersistencePort)
    private userVerificationPersistence: UserVerificationPersistencePort,
    @Inject(VerificationNotifierPort)
    private verificationNotifier: VerificationNotifierPort,
  ) {}

  async initiateVerification(userId: string, email: string): Promise<void> {
    const otp = this.generateOtp();
    const token = this.generateToken();

    await this.userVerificationPersistence.save(
      UserVerificationEntity.newInstance(otp, token, userId),
    );
    await this.verificationNotifier.notify(email, otp, token)
  }

  private generateOtp(): string {
    return otp.generate(6, { lowerCaseAlphabets: false, specialChars: false });
  }

  private generateToken(): string {
    return secureRandom({ length: 32 });
  }
}
