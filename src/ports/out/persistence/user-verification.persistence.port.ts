import { UserVerification } from "@domain/models/UserVerification";

export interface UserVerificationPersistencePort {
  save(payload: UserVerification): Promise<void>;
}

export const UserVerificationPersistencePort = Symbol('UserVerificationPersistencePort');
