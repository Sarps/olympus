export interface VerifyUserPort {
  verify(token: string): Promise<any>;
}
