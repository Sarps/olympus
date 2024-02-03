import { UserVerification } from "@domain/models/UserVerification";

export interface UserVerificationPersistencePort {
  save(payload: UserVerification): Promise<void>;

  findUserIdByOtpOrToken(otpOrToken: string): Promise<string>;
}

export const UserVerificationPersistencePort = Symbol("UserVerificationPersistencePort");
