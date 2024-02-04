import { Body, Controller, Get, Inject, ParseIntPipe, Post, Query, UseGuards } from "@nestjs/common";
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
import { RequestUser } from "@adapters/passport/user.decorator";
import { User } from "@prisma/client";
import { PaginationDto } from "@adapters/web/dto/pagination.dto";

@ApiTags('Transactions')
@Controller('transactions')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden' })
@UseGuards(JwtGuard, UserVerifiedGuard)
@ApiBearerAuth()
export class TransactionsController {
  constructor(
    // @Inject(InitiateTransactionPort)
    // private readonly initiateTransaction: InitiateTransactionPort,
    @Inject(TransactionHistoryPort)
    private readonly transactionHistory: TransactionHistoryPort
  ) {}

  @Post()
  postTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    // return this.initiateTransaction.initiateTransaction(createTransactionDto as any);
  }

  @Get()
  getUserTransactionHistory(@Query() { page, perPage }: PaginationDto, @RequestUser() user: User) {
    return this.transactionHistory.getUserTransactionHistory(user.id, +page || 1, +perPage || 10);
  }
}
