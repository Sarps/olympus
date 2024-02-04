import { It, Mock, Times } from 'moq.ts';
import { WalletPersistencePort } from '@ports/out/persistence/wallet.persistence.port';
import { CreateUserWalletUseCase } from '@domain/application/wallets/create-user-wallet.use-case';
import { WalletEntity } from '@domain/models/entities/wallet.entity';

describe('CreateUserWalletUseCase', () => {
  let walletPersistence: Mock<WalletPersistencePort>;
  let createUserWalletUseCase: CreateUserWalletUseCase;

  beforeEach(() => {
    walletPersistence = new Mock<WalletPersistencePort>();
    createUserWalletUseCase = new CreateUserWalletUseCase(
      walletPersistence.object(),
    );
  });

  it('should create a user wallet successfully', async () => {
    const userId = 'testUserId';
    walletPersistence.setup((i) => i.save(It.IsAny())).returnsAsync(undefined);

    await createUserWalletUseCase.createUserWallet(userId);

    walletPersistence.verify(
      (i) => i.save(It.Is<WalletEntity>((wallet) => wallet.userId === userId)),
      Times.Once(),
    );
  });

  it('should handle errors during wallet creation', async () => {
    const userId = 'testUserId';
    walletPersistence
      .setup((i) => i.save(It.IsAny()))
      .throws(new Error('Database error'));

    await expect(
      createUserWalletUseCase.createUserWallet(userId),
    ).rejects.toThrow('Database error');

    walletPersistence.verify((i) => i.save(It.IsAny()), Times.Once());
  });
});
