export interface InitiateUserVerificationPort {
  initiateVerification(userId: string, email: string): Promise<void>;
}

export const InitiateUserVerificationPort = Symbol(
  'InitiateUserVerificationPort',
);
