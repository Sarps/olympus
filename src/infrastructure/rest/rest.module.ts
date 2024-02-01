import { Module } from '@nestjs/common';
import { TransactionsController } from '@infrastructure/rest/transactions.controller';
import { TransactionsPort } from '@domain/ports/in/transactions.interface';
import { TransactionsService } from '@domain/services/transactions.service';
import { AuthService } from '@domain/services/auth.service';
import { UsersService } from '@domain/services/users.service';
import { AuthController } from '@infrastructure/rest/auth.controller';
import { UsersController } from '@infrastructure/rest/users.controller';

@Module({
  controllers: [TransactionsController, AuthController, UsersController],
  imports: [],
  providers: [
    { provide: TransactionsPort, useClass: TransactionsService },
    AuthService,
    UsersService,
  ],
})
export class RestModule {}
