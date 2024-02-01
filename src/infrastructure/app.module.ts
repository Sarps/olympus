import { Module } from '@nestjs/common';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { NotificationModule } from '@infrastructure/notification/notification.module';
import { QueueModule } from '@infrastructure/queue/queue.module';
import { AuthModule } from '@infrastructure/auth/auth.module';
import { RestModule } from '@infrastructure/rest/rest.module';
import { PaymentNotifierUseCase } from '@application/payment-notifier';
import { IPaymentNotifier } from '@application/payment-notifier.interface';
import { ITransactionProcessor } from '@application/transaction-processor.interface';
import { TransactionProcessorUseCase } from '@application/transaction-processor';

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
