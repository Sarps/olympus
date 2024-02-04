import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { TransactionsService } from '@domain/services/transactions.service';
import { InitiateTransactionPort } from '@ports/in/transactions/initiate-transaction.port';
import { TransactionHistoryPort } from '@ports/in/transactions/transaction-history.port';
import { CreateTransactionDto } from '@domain/models/dto/create-transaction.dto';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserVerifiedGuard } from '@adapters/web/user-verified.guard';
import { JwtGuard } from "@adapters/passport/guards/jwt.guard";

@ApiTags('Transactions')
@Controller('transactions')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden' })
@UseGuards(JwtGuard, UserVerifiedGuard)
@ApiBearerAuth()
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
