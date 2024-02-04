import { UserVerificationEntity } from "@domain/models/entities/user-verification.entity";

export interface UserVerificationPersistencePort {
  save(payload: UserVerificationEntity): Promise<void>;

  findUserIdByOtpOrToken(otpOrToken: string): Promise<string>;
}

export const UserVerificationPersistencePort = Symbol("UserVerificationPersistencePort");
