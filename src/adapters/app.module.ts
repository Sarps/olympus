import { Module } from '@nestjs/common';
import { SmtpModule } from '@adapters/smtp/smtp.module';
import { WebModule } from '@adapters/web/web.module';
import { PassportModule } from '@adapters/passport/passport.module';

@Module({
  imports: [PassportModule, SmtpModule, WebModule],
})
export class AppModule {}
