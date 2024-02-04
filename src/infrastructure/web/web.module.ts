import { Module } from '@nestjs/common';
import { TransactionsController } from '@infrastructure/web/controllers/transactions.controller';
import { InitiateTransactionUseCase } from '@domain/application/transactions/initiate-transaction.use-case';
import { AuthController } from '@infrastructure/web/controllers/auth.controller';
import { UsersController } from '@infrastructure/web/controllers/users.controller';
import { UserProfilePort } from '@ports/in/users/user-profile.port';
import { UserProfileUseCase } from '@domain/application/users/user-profile.use-case';
import { RegisterPort } from '@ports/in/auth/register.port';
import { RegisterUseCase } from '@domain/application/auth/register.use-case';
import { PrismaModule } from '@infrastructure/prisma/prisma.module';
import { PassportModule } from '@infrastructure/passport/passport.module';
import { KafkaModule } from '@infrastructure/kafka/kafka.module';
import { VerifyUserPort } from '@ports/in/users/verify-user.port';
import { VerifyUserUseCase } from '@domain/application/users/verify-user.use-case';
import { UserWalletBalanceUseCase } from '@domain/application/wallets/user-wallet-balance.use-case';
import { UserWalletBalancePort } from '@ports/in/wallets/user-wallet-balance.port';
import { TransactionHistoryPort } from '@ports/in/transactions/transaction-history.port';
import { TransactionHistoryUseCase } from '@domain/application/transactions/transaction-history.use-case';
import { InitiateTransactionPort } from '@ports/in/transactions/initiate-transaction.port';
import { ITransactionProcessor } from '@domain/application/transactions/transaction-processor.interface';
import { TransactionProcessorUseCase } from '@domain/application/transactions/transaction-processor.use-case';

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
