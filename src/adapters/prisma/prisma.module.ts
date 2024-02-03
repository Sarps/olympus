import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { TransactionPersistencePort } from "@ports/out/persistence/TransactionPersistencePort";
import { TransactionsRepository } from "@adapters/prisma/transactions.repository";
import { UserPersistencePort } from "@ports/out/persistence/UserPersistencePort";
import { UsersRepository } from "@adapters/prisma/users.repository";

@Module({
  providers: [
    PrismaService,
    { provide: TransactionPersistencePort, useClass: TransactionsRepository },
    { provide: UserPersistencePort, useClass: UsersRepository },
  ],
  exports: [
    { provide: UserPersistencePort, useClass: UsersRepository },
  ]
})
export class PrismaModule {
}
