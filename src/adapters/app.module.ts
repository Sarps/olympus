import { Module } from '@nestjs/common';
import { DatabaseModule } from '@adapters/database/database.module';
import { NotificationModule } from '@adapters/notification/notification.module';
import { QueueModule } from '@adapters/queue/queue.module';
import { AuthModule } from '@adapters/auth/auth.module';
import { WebModule } from '@adapters/web/web.module';
import {
  PaymentNotifier,
  PaymentNotifierUseCase,
} from '@domain/application/PaymentNotifier';
import {
  TransactionProcessor,
  TransactionProcessorUseCase,
} from '@domain/application/TransactionProcessor';

@Module({
  imports: [
    DatabaseModule,
    NotificationModule,
    QueueModule,
    AuthModule,
    WebModule,
  ],
  controllers: [],
  providers: [
    { provide: PaymentNotifier, useClass: PaymentNotifierUseCase },
    { provide: TransactionProcessor, useClass: TransactionProcessorUseCase },
  ],
})
export class AppModule {}
