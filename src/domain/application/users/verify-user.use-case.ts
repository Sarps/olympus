import { VerifyUserPort } from '@ports/in/users/verify-user.port';
import { Inject } from '@nestjs/common';
import { UserVerificationPersistencePort } from '@ports/out/persistence/user-verification.persistence.port';
import { UserPersistencePort } from '@ports/out/persistence/user.persistence.port';
import { UserVerifiedEventPort } from '@ports/out/events/user-verified.event.port';
import { UserEntity } from '@domain/models/entities/user.entity';
import * as console from 'console';
import e from 'express';

export class VerifyUserUseCase implements VerifyUserPort {
  constructor(
    @Inject(UserVerificationPersistencePort)
    private userVerificationPersistence: UserVerificationPersistencePort,
    @Inject(UserPersistencePort)
    private userPersistence: UserPersistencePort,
    @Inject(UserVerifiedEventPort)
    private userVerifiedEventPort: UserVerifiedEventPort,
  ) {}

  verifyByOtp(token: string, user: UserEntity): Promise<boolean> {
    return this.verifyByTokenOrOtp(token);
  }

  verifyByToken(token: string): Promise<boolean> {
    return this.verifyByTokenOrOtp(token);
  }

  async verifyByTokenOrOtp(token: string): Promise<boolean> {
    try {
      const userId =
        await this.userVerificationPersistence.findUserIdByOtpOrToken(token);
      await this.fireEvent(await this.updateUserStatus(userId));
      return true;
    } catch (e) {}
    return false;
  }

  private async updateUserStatus(userId: string): Promise<UserEntity> {
    const user = await this.userPersistence.findById(userId);
    user.lastVerified = new Date();
    await this.userPersistence.update(user);
    return user;
  }

  async fireEvent({ passwordHash: _, ...payload }: UserEntity) {
    await this.userVerifiedEventPort.fire(payload);
  }
}
