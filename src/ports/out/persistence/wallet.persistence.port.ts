import { WalletEntity } from '@domain/models/entities/wallet.entity';

export interface WalletPersistencePort {
  save(payload: WalletEntity): Promise<void>;

  findByUserId(userId: string): Promise<WalletEntity>;
  decreaseIncreaseBalance(
    sourceUserId: string,
    recipientUserId: string,
    amount: number,
  ): Promise<void>;
}

export const WalletPersistencePort = Symbol('WalletPersistencePort');
