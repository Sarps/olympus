import { Module } from '@nestjs/common';
import { EmailService } from '@infrastructure/smtp/email.service';
import { VerificationNotifierPort } from '@ports/out/notifications/verification-notifier.port';
import { VerificationNotifierEmailer } from '@infrastructure/smtp/emailers/verification-notifier.emailer';
import { TransactionReceivedEmailer } from '@infrastructure/smtp/emailers/transaction-received.emailer';

@Module({
  providers: [
    EmailService,
    TransactionReceivedEmailer,
    {
      provide: VerificationNotifierPort,
      useClass: VerificationNotifierEmailer,
    },
  ],
  exports: [TransactionReceivedEmailer, VerificationNotifierPort],
})
export class SmtpModule {}
