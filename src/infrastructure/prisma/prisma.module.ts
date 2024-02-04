import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { TransactionPersistencePort } from '@ports/out/persistence/transaction.persistence.port';
import { TransactionsRepository } from '@infrastructure/prisma/repositories/transactions.repository';
import { UserPersistencePort } from '@ports/out/persistence/user.persistence.port';
import { UsersRepository } from '@infrastructure/prisma/repositories/users.repository';
import { UserVerificationPersistencePort } from '@ports/out/persistence/user-verification.persistence.port';
import { UserVerificationsRepository } from '@infrastructure/prisma/repositories/user-verifications.repository';
import { WalletPersistencePort } from '@ports/out/persistence/wallet.persistence.port';
import { WalletsRepository } from '@infrastructure/prisma/repositories/wallets.repository';

@Module({
  providers: [
    PrismaService,
    { provide: TransactionPersistencePort, useClass: TransactionsRepository },
    { provide: UserPersistencePort, useClass: UsersRepository },
    {
      provide: UserVerificationPersistencePort,
      useClass: UserVerificationsRepository,
    },
    { provide: WalletPersistencePort, useClass: WalletsRepository },
  ],
  exports: [
    TransactionPersistencePort,
    UserPersistencePort,
    UserVerificationPersistencePort,
    WalletPersistencePort,
  ],
})
export class PrismaModule {}
