export interface CreateUserWalletPort {
  createUserWallet(userId: string): Promise<void>;
}

export const CreateUserWalletPort = Symbol('CreateUserWalletPort');
