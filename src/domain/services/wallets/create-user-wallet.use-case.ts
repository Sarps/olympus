import { CreateUserWalletPort } from "@ports/in/wallets/create-user-wallet.port";
import { WalletEntity } from "@domain/models/entities/wallet.entity";
import { Inject } from "@nestjs/common";
import { WalletPersistencePort } from "@ports/out/persistence/wallet.persistence.port";

export class CreateUserWalletUseCase implements CreateUserWalletPort {

  constructor(
    @Inject(WalletPersistencePort)
    private walletPersistence: WalletPersistencePort
  ) {
  }

  async createUserWallet(userId: string): Promise<void> {
    await this.walletPersistence.save(WalletEntity.newInstance(userId));
  }

}
