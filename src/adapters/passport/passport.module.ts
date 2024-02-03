import { Module } from "@nestjs/common";
import { PrismaModule } from "@adapters/prisma/prisma.module";
import { PassportModule as ExternalPassportModule } from "@nestjs/passport";
import { JwtStrategy } from "@adapters/passport/strategies/jwt.strategy";
import { LocalStrategy } from "@adapters/passport/strategies/local.strategy";
import { LoginPort } from "@ports/in/auth/LoginPort";
import { LoginUseCase } from "@domain/services/LoginUseCase";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { JWT_EXPIRES_IN, JWT_SECRET } from "@adapters/constants";

@Module({
  imports: [
    PrismaModule,
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: JWT_EXPIRES_IN }
    }),
    ExternalPassportModule
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    { provide: LoginPort, useClass: LoginUseCase }
  ],
  exports: [
    JwtModule
  ]
})
export class PassportModule {
}
