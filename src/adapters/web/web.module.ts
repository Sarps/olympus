import { Module } from '@nestjs/common';
import { TransactionsController } from '@adapters/web/controllers/transactions.controller';
import {
  TransactionsService,
  TransactionsServiceImpl,
} from '@domain/services/transactions.service';
import { AuthService } from '@domain/services/auth.service';
import { UsersService } from '@domain/services/users.service';
import { AuthController } from '@adapters/web/controllers/auth.controller';
import { UsersController } from '@adapters/web/controllers/users.controller';

@Module({
  controllers: [TransactionsController, AuthController, UsersController],
  imports: [],
  providers: [
    { provide: TransactionsService, useClass: TransactionsServiceImpl },
    AuthService,
    UsersService,
  ],
})
export class WebModule {}
