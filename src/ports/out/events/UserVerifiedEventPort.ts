export interface UserVerifiedEventPort {
  notifyUserVerification(): Promise<void>;
}
