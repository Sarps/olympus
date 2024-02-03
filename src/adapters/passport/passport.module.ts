import { Module } from "@nestjs/common";
import { PrismaModule } from "@adapters/prisma/prisma.module";
import { PassportModule as ExternalPassportModule } from "@nestjs/passport";
import { JwtStrategy } from "@adapters/passport/strategies/jwt.strategy";
import { LocalStrategy } from "@adapters/passport/strategies/local.strategy";
import { LoginPort } from "@ports/in/auth/LoginPort";
import { LoginUseCase } from "@domain/services/LoginUseCase";

@Module({
  imports: [
    PrismaModule,
    ExternalPassportModule
  ],
  providers: [
    LocalStrategy,
    JwtStrategy,
    { provide: LoginPort, useClass: LoginUseCase },
  ],
  exports: []
})
export class PassportModule {
}
