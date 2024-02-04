import { WalletEntity } from '@domain/models/entities/wallet.entity';
import { AmountEntity } from "@domain/models/entities/amount.entity";

export interface UserWalletBalancePort {
  viewUserWalletBalance(userId: string): Promise<AmountEntity>;
}

export const UserWalletBalancePort = Symbol("UserWalletBalancePort")
