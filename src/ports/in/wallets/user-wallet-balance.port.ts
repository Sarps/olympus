import { Wallet } from '@domain/models/Wallet';

export interface UserWalletBalancePort {
  viewUserWalletBalance(): Promise<Wallet>;
}
