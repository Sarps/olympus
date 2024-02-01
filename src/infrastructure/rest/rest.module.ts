import { Module } from '@nestjs/common';
import { TransactionsController } from '@infrastructure/rest/transactions.controller';
import { TransactionsPort } from '@domain/ports/in/transaction.interface';
import { TransactionsService } from '@domain/services/transactions.service';

@Module({
  controllers: [TransactionsController],
  imports: [],
  providers: [{ provide: TransactionsPort, useClass: TransactionsService }],
})
export class RestModule {}
