import { Module } from '@nestjs/common';
import { PrismaModule } from '@adapters/prisma/prisma.module';
import { SmtpModule } from '@adapters/smtp/smtp.module';
import { KafkaModule } from '@adapters/kafka/kafka.module';
import { WebModule } from '@adapters/web/web.module';
import {
  PaymentNotifier,
  PaymentNotifierUseCase,
} from '@domain/application/PaymentNotifier';
import {
  TransactionProcessor,
  TransactionProcessorUseCase,
} from '@domain/application/TransactionProcessor';
import { PassportModule } from '@adapters/passport/passport.module';

@Module({
  imports: [PrismaModule, PassportModule, SmtpModule, WebModule],
  controllers: [],
  providers: [
    { provide: PaymentNotifier, useClass: PaymentNotifierUseCase },
    { provide: TransactionProcessor, useClass: TransactionProcessorUseCase },
  ],
})
export class AppModule {}
