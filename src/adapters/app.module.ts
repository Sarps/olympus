import { Module } from '@nestjs/common';
import { DatabaseModule } from '@adapters/database/database.module';
import { NotificationModule } from '@adapters/notification/notification.module';
import { QueueModule } from '@adapters/queue/queue.module';
import { AuthModule } from '@adapters/auth/auth.module';
import { RestModule } from '@adapters/rest/rest.module';
import { PaymentNotifierUseCase } from '@domain/application/payment-notifier';
import { IPaymentNotifier } from '@domain/application/payment-notifier.interface';
import { ITransactionProcessor } from '@domain/application/transaction-processor.interface';
import { TransactionProcessorUseCase } from '@domain/application/transaction-processor';

@Module({
  imports: [
    DatabaseModule,
    NotificationModule,
    QueueModule,
    AuthModule,
    RestModule,
  ],
  controllers: [],
  providers: [
    { provide: IPaymentNotifier, useClass: PaymentNotifierUseCase },
    { provide: ITransactionProcessor, useClass: TransactionProcessorUseCase },
  ],
})
export class AppModule {}
