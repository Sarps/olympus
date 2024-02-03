import { Module } from '@nestjs/common';
import { TransactionsController } from '@adapters/web/controllers/transactions.controller';
import {
  TransactionsService,
  TransactionsServiceImpl,
} from '@domain/services/transactions.service';
import { AuthController } from '@adapters/web/controllers/auth.controller';
import { UsersController } from '@adapters/web/controllers/users.controller';
import { UserProfilePort } from '@ports/in/users/UserProfilePort';
import { UserProfileUseCase } from '@domain/services/UserProfileUseCase';
import { RegisterPort } from '@ports/in/auth/RegisterPort';
import { RegisterUseCase } from '@domain/services/RegisterUseCase';
import { PrismaModule } from '@adapters/prisma/prisma.module';
import { PassportModule } from '@adapters/passport/passport.module';
import { KafkaModule } from "@adapters/kafka/kafka.module";

@Module({
  controllers: [TransactionsController, AuthController, UsersController],
  imports: [PrismaModule, PassportModule, KafkaModule],
  providers: [
    { provide: TransactionsService, useClass: TransactionsServiceImpl },
    { provide: UserProfilePort, useClass: UserProfileUseCase },
    { provide: RegisterPort, useClass: RegisterUseCase },
  ],
})
export class WebModule {}
