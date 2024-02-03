import { VerifyUserPort } from "@ports/in/users/verify-user.port";
import { Inject } from "@nestjs/common";
import { UserVerificationPersistencePort } from "@ports/out/persistence/user-verification.persistence.port";
import { UserPersistencePort } from "@ports/out/persistence/user.persistence.port";

export class VerifyUserUseCase implements VerifyUserPort {

  constructor(
    @Inject(UserVerificationPersistencePort)
    private userVerificationPersistence: UserVerificationPersistencePort,
    @Inject(UserPersistencePort)
    private userPersistence: UserPersistencePort
  ) {
  }

  async verifyByTokenOrOtp(token: string): Promise<boolean> {
    try {
      const userId = await this.userVerificationPersistence.findUserIdByOtpOrToken(token)
      const user = await this.userPersistence.findById(userId)
      user.lastVerified = new Date()
      await this.userPersistence.update(user)
      return true
    } catch (e) {
      console.log("Error verifying user", e)
    }
    return false
  }

}
