import { Module } from '@nestjs/common';
import { PrismaModule } from '@infrastructure/prisma/prisma.module';
import { PassportModule as ExternalPassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@infrastructure/passport/strategies/jwt.strategy';
import { LocalStrategy } from '@infrastructure/passport/strategies/local.strategy';
import { LoginPort } from '@ports/in/auth/login.port';
import { LoginUseCase } from '@domain/application/auth/login.use-case';
import { JwtModule } from '@nestjs/jwt';
import { JWT_EXPIRES_IN, JWT_SECRET } from '@infrastructure/constants';

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES_IN },
    }),
    ExternalPassportModule,
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    { provide: LoginPort, useClass: LoginUseCase },
  ],
  exports: [JwtModule],
})
export class PassportModule {}
