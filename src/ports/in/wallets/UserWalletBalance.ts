import { Wallet } from '@domain/models/Wallet';

export interface UserWalletBalance {
  viewUserWalletBalance(): Promise<Wallet>;
}
