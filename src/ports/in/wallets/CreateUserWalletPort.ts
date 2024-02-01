import { Wallet } from '@domain/models/Wallet';
import { User } from '@domain/models/User';
import { Currency } from '@domain/models/enums/Currency';

export interface CreateUserWalletPort {
  createUserWallet(user: User, currency: Currency): Promise<Wallet>;
}
