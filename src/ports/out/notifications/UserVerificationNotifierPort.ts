export interface UserVerificationNotifierPort {
  notifyUserVerification(): Promise<void>;
}
