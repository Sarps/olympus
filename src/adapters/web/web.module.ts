import { Module } from "@nestjs/common";
import { TransactionsController } from "@adapters/web/controllers/transactions.controller";
import { TransactionsService, TransactionsServiceImpl } from "@domain/services/transactions.service";
import { AuthController } from "@adapters/web/controllers/auth.controller";
import { UsersController } from "@adapters/web/controllers/users.controller";
import { UserProfilePort } from "@ports/in/users/UserProfilePort";
import { UserProfileUseCase } from "@domain/services/UserProfileUseCase";

@Module({
  controllers: [TransactionsController, AuthController, UsersController],
  imports: [],
  providers: [
    { provide: TransactionsService, useClass: TransactionsServiceImpl },
    { provide: UserProfilePort, useClass: UserProfileUseCase }
  ]
})
export class WebModule {
}
