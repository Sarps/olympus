import { Module } from '@nestjs/common';
import { TransactionsController } from '@adapters/web/controllers/transactions.controller';
import { InitiateTransactionUseCase } from '@domain/services/transactions/initiate-transaction.use-case';
import { AuthController } from '@adapters/web/controllers/auth.controller';
import { UsersController } from '@adapters/web/controllers/users.controller';
import { UserProfilePort } from '@ports/in/users/user-profile.port';
import { UserProfileUseCase } from '@domain/services/users/user-profile.use-case';
import { RegisterPort } from '@ports/in/auth/register.port';
import { RegisterUseCase } from '@domain/services/auth/register.use-case';
import { PrismaModule } from '@adapters/prisma/prisma.module';
import { PassportModule } from '@adapters/passport/passport.module';
import { KafkaModule } from '@adapters/kafka/kafka.module';
import { VerifyUserPort } from '@ports/in/users/verify-user.port';
import { VerifyUserUseCase } from '@domain/services/users/verify-user.use-case';
import { UserWalletBalanceUseCase } from '@domain/services/wallets/user-wallet-balance.use-case';
import { UserWalletBalancePort } from '@ports/in/wallets/user-wallet-balance.port';
import { TransactionHistoryPort } from '@ports/in/transactions/transaction-history.port';
import { TransactionHistoryUseCase } from '@domain/services/transactions/transaction-history.use-case';
import { InitiateTransactionPort } from '@ports/in/transactions/initiate-transaction.port';
import { ITransactionProcessor } from '@domain/services/transactions/transaction-processor.interface';
import { TransactionProcessorUseCase } from '@domain/services/transactions/transaction-processor.use-case';

@Module({
  controllers: [TransactionsController, AuthController, UsersController],
  imports: [PrismaModule, PassportModule, KafkaModule],
  providers: [
    { provide: UserProfilePort, useClass: UserProfileUseCase },
    { provide: RegisterPort, useClass: RegisterUseCase },
    { provide: VerifyUserPort, useClass: VerifyUserUseCase },
    { provide: UserWalletBalancePort, useClass: UserWalletBalanceUseCase },
    { provide: TransactionHistoryPort, useClass: TransactionHistoryUseCase },
    { provide: InitiateTransactionPort, useClass: InitiateTransactionUseCase },
    { provide: ITransactionProcessor, useClass: TransactionProcessorUseCase },
  ],
})
export class WebModule {}
