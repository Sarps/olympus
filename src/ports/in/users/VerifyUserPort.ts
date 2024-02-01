export interface VerifyUserPort {
  verify(id: string): Promise<any>;
}
