import { Module } from '@nestjs/common';
import { EmailService } from '@infrastructure/smtp/email.service';
import { VerificationNotifierPort } from '@ports/out/notifications/verification-notifier.port';
import { VerificationNotifierEmailer } from '@infrastructure/smtp/emailers/verification-notifier.emailer';

@Module({
  providers: [
    EmailService,
    { provide: VerificationNotifierPort, useClass: VerificationNotifierEmailer }
  ],
  exports: [
    VerificationNotifierPort
  ]
})
export class SmtpModule {
}
