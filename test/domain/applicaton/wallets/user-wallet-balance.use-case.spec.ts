import { Mock, Times } from 'moq.ts';
import { WalletPersistencePort } from '@ports/out/persistence/wallet.persistence.port';
import { UserWalletBalanceUseCase } from '@domain/application/wallets/user-wallet-balance.use-case';
import { AmountEntity } from '@domain/models/entities/amount.entity';
import { WalletEntity } from '@domain/models/entities/wallet.entity';
import { Currency } from '@domain/models/enums/currency';

describe('UserWalletBalanceUseCase', () => {
  let walletPersistence: Mock<WalletPersistencePort>;
  let userWalletBalanceUseCase: UserWalletBalanceUseCase;

  beforeEach(() => {
    walletPersistence = new Mock<WalletPersistencePort>();
    userWalletBalanceUseCase = new UserWalletBalanceUseCase(
      walletPersistence.object(),
    );
  });

  it('should return the user wallet balance', async () => {
    const userId = 'testUserId';
    const expectedBalance = new AmountEntity(Currency.USD, 10);

    walletPersistence
      .setup((i) => i.findByUserId(userId))
      .returnsAsync(
        new Mock<WalletEntity>()
          .setup((i) => i.balance)
          .returns(expectedBalance)
          .object(),
      );

    const balance =
      await userWalletBalanceUseCase.viewUserWalletBalance(userId);

    expect(balance).toBe(expectedBalance);
    walletPersistence.verify((i) => i.findByUserId(userId), Times.Once());
  });

  it('should handle errors when wallet is not found', async () => {
    const userId = 'testUserId';
    walletPersistence
      .setup((i) => i.findByUserId(userId))
      .throws(new Error('Wallet not found'));

    await expect(
      userWalletBalanceUseCase.viewUserWalletBalance(userId),
    ).rejects.toThrow('Wallet not found');

    walletPersistence.verify((i) => i.findByUserId(userId), Times.Once());
  });
});
