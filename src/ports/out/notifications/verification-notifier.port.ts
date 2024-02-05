export interface VerificationNotifierPort {
  notify(email: string, otp: string, token: string): Promise<void>
}

export const VerificationNotifierPort = Symbol("VerificationNotifierPort")
