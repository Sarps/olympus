import { Body, Controller, Get, Inject, Post, UseGuards } from "@nestjs/common";
import { TransactionsService } from '@domain/services/transactions.service';
import { InitiateTransactionPort } from '@ports/in/transactions/InitiateTransactionPort';
import { TransactionHistoryPort } from '@ports/in/transactions/TransactionHistoryPort';
import { CreateTransactionDto } from '@domain/models/dto/create-transaction.dto';
import { ApiForbiddenResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@ApiTags('Transactions')
@Controller('transactions')
@ApiUnauthorizedResponse({description: 'Unauthorized'})
@ApiForbiddenResponse({description: 'Forbidden'})
@UseGuards(AuthGuard('access-token'))
export class TransactionsController
  implements InitiateTransactionPort, TransactionHistoryPort
{
  constructor(
    @Inject(TransactionsService)
    private readonly transactionsPort: TransactionsService,
  ) {}

  @Post()
  initiateTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsPort.createTransaction(createTransactionDto as any);
  }

  @Get()
  getUserTransactionHistory() {
    return this.transactionsPort.findByUserId();
  }
}
