import { UserWalletBalancePort } from '@ports/in/wallets/user-wallet-balance.port';
import { AmountEntity } from '@domain/models/entities/amount.entity';
import { Inject } from '@nestjs/common';
import { WalletPersistencePort } from '@ports/out/persistence/wallet.persistence.port';

export class UserWalletBalanceUseCase implements UserWalletBalancePort {
  constructor(
    @Inject(WalletPersistencePort)
    private walletPersistence: WalletPersistencePort,
  ) {}

  async viewUserWalletBalance(userId: string): Promise<AmountEntity> {
    const wallet = await this.walletPersistence.findByUserId(userId);
    return wallet.balance;
  }
}
