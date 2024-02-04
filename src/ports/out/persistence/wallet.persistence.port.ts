import { WalletEntity } from '@domain/models/entities/wallet.entity';

export interface WalletPersistencePort {
  save(payload: WalletEntity): Promise<void>;

  findByUserId(userId: string): Promise<WalletEntity>;
}

export const WalletPersistencePort = Symbol('WalletPersistencePort');
