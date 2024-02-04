import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { InitiateTransactionPort } from '@ports/in/transactions/initiate-transaction.port';
import { TransactionHistoryPort } from '@ports/in/transactions/transaction-history.port';
import { CreateTransactionDto } from '@adapters/web/dto/create-transaction.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth, ApiConflictResponse,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse, ApiUnprocessableEntityResponse
} from "@nestjs/swagger";
import { UserVerifiedGuard } from '@adapters/web/user-verified.guard';
import { JwtGuard } from '@adapters/passport/guards/jwt.guard';
import { RequestUser } from '@adapters/passport/user.decorator';
import { User } from '@prisma/client';
import { PaginationDto } from '@adapters/web/dto/pagination.dto';

@ApiTags('Transactions')
@Controller('transactions')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden' })
@UseGuards(JwtGuard, UserVerifiedGuard)
@ApiBearerAuth()
export class TransactionsController {
  constructor(
    @Inject(InitiateTransactionPort)
    private readonly initiateTransaction: InitiateTransactionPort,
    @Inject(TransactionHistoryPort)
    private readonly transactionHistory: TransactionHistoryPort,
  ) {}

  @Post()
  @ApiUnprocessableEntityResponse({description: 'Cross-currency transfers not allowed or insufficient balance'})
  @ApiBadRequestResponse({description: 'Invalid Recipient or sender'})
  @ApiConflictResponse({description: 'Idempotency key is not unique'})
  postTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    return this.initiateTransaction.initiateTransaction(createTransactionDto);
  }

  @Get()
  getUserTransactionHistory(
    @Query() { page, perPage }: PaginationDto,
    @RequestUser() user: User,
  ) {
    return this.transactionHistory.getUserTransactionHistory(
      user.id,
      +page || 1,
      +perPage || 10,
    );
  }
}
