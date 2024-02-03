export interface UserVerifiedEventPort {
  fire(): Promise<void>;
}
