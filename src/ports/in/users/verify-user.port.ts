export interface VerifyUserPort {
  verifyByTokenOrOtp(token: string): Promise<boolean>;
}

export const VerifyUserPort = Symbol('VerifyUserPort');
