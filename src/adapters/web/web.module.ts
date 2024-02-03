import { Module } from '@nestjs/common';
import { TransactionsController } from '@adapters/web/controllers/transactions.controller';
import {
  TransactionsService,
  TransactionsServiceImpl,
} from '@domain/services/transactions.service';
import { AuthController } from '@adapters/web/controllers/auth.controller';
import { UsersController } from '@adapters/web/controllers/users.controller';
import { UserProfilePort } from '@ports/in/users/user-profile.port';
import { UserProfileUseCase } from '@domain/services/user-profile.use-case';
import { RegisterPort } from '@ports/in/auth/register.port';
import { RegisterUseCase } from '@domain/services/register.use-case';
import { PrismaModule } from '@adapters/prisma/prisma.module';
import { PassportModule } from '@adapters/passport/passport.module';
import { KafkaModule } from "@adapters/kafka/kafka.module";
import { VerifyUserPort } from "@ports/in/users/verify-user.port";
import { VerifyUserUseCase } from "@domain/services/verify-user.use-case";

@Module({
  controllers: [TransactionsController, AuthController, UsersController],
  imports: [PrismaModule, PassportModule, KafkaModule],
  providers: [
    { provide: TransactionsService, useClass: TransactionsServiceImpl },
    { provide: UserProfilePort, useClass: UserProfileUseCase },
    { provide: RegisterPort, useClass: RegisterUseCase },
    { provide: VerifyUserPort, useClass: VerifyUserUseCase },
  ],
})
export class WebModule {}
