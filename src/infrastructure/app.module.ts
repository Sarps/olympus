import { Module } from '@nestjs/common';
import { SmtpModule } from '@infrastructure/smtp/smtp.module';
import { WebModule } from '@infrastructure/web/web.module';
import { PassportModule } from '@infrastructure/passport/passport.module';

@Module({
  imports: [PassportModule, SmtpModule, WebModule],
})
export class AppModule {}
