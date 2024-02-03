import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { TransactionPersistencePort } from '@ports/out/persistence/TransactionPersistencePort';
import { TransactionsRepository } from '@adapters/prisma/transactions.repository';
import { UserPersistencePort } from '@ports/out/persistence/UserPersistencePort';
import { UsersRepository } from '@adapters/prisma/users.repository';
import { UserVerificationPersistencePort } from "@ports/out/persistence/UserVerificationPersistencePort";
import { UserVerificationsRepository } from "@adapters/prisma/user-verifications.repository";

@Module({
  providers: [
    PrismaService,
    { provide: TransactionPersistencePort, useClass: TransactionsRepository },
    { provide: UserPersistencePort, useClass: UsersRepository },
    { provide: UserVerificationPersistencePort, useClass: UserVerificationsRepository },
  ],
  exports: [
    UserPersistencePort,
    UserVerificationPersistencePort
  ],
})
export class PrismaModule {}
