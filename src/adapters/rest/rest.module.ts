import { Module } from '@nestjs/common';
import { TransactionsController } from '@adapters/rest/transactions.controller';
import {
  TransactionsService,
  TransactionsServiceImpl,
} from '@domain/services/transactions.service';
import { AuthService } from '@domain/services/auth.service';
import { UsersService } from '@domain/services/users.service';
import { AuthController } from '@adapters/rest/auth.controller';
import { UsersController } from '@adapters/rest/users.controller';

@Module({
  controllers: [TransactionsController, AuthController, UsersController],
  imports: [],
  providers: [
    { provide: TransactionsService, useClass: TransactionsServiceImpl },
    AuthService,
    UsersService,
  ],
})
export class RestModule {}
