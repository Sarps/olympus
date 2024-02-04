import { OTP_EXPIRY_MINUTES, TOKEN_EXPIRY_MINUTES } from '@infrastructure/constants';

export class UserVerificationEntity {
  constructor(
    public id: string | null,
    public otpCode: string,
    public otpExpiresAt: Date,
    public linkToken: string,
    public linkExpiresAt: Date,
    public attempts: number,
    public userId: string,
  ) {}

  static newInstance(otpCode: string, linkToken: string, userId: string) {
    return new UserVerificationEntity(
      null,
      otpCode,
      this.getExpiry(OTP_EXPIRY_MINUTES),
      linkToken,
      this.getExpiry(TOKEN_EXPIRY_MINUTES),
      0,
      userId,
    );
  }

  static getExpiry(duration: number) {
    return new Date(new Date().getTime() + duration * 60000);
  }
}
