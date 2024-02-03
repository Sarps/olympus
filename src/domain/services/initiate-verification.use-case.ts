import { InitiateUserVerificationPort } from "@ports/in/users/initiate-user-verification.port";
import secureRandom from "secure-random-string";
import { VERIFY_URL } from "@adapters/constants";
import { UserVerificationPersistencePort } from "@ports/out/persistence/user-verification.persistence.port";
import { Inject } from "@nestjs/common";
import { UserVerification } from "@domain/models/UserVerification";
import otp from 'otp-generator'

export class InitiateVerificationUseCase implements InitiateUserVerificationPort {

  constructor(
    @Inject(UserVerificationPersistencePort)
    private userVerificationPersistence: UserVerificationPersistencePort
  ) {
  }

  async initiateVerification(userId: string, email: string): Promise<void> {
    const otp = this.generateOtp();
    const token = this.generateToken();

    await this.userVerificationPersistence.save(
      UserVerification.newInstance(otp, token, userId)
    );
    await this.sendVerificationEmail(email, otp, token);
  }

  private generateOtp(): string {
    return otp.generate(6, { lowerCaseAlphabets: false, specialChars: false });
  }

  private generateToken(): string {
    return secureRandom({ length: 32 });
  }

  private async sendVerificationEmail(email: string, otp: string, token: string): Promise<void> {
    const verificationLink = `${VERIFY_URL}/${token}`;
    console.log(`Sending email to: ${email}`);
    console.log(`Your OTP is ${otp}. Or click on this link to verify your account: ${verificationLink}`);
  }
}
