import {
  BadRequestException,
  Body,
  Controller,
  Get, Headers,
  Inject, ParseUUIDPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { InitiateTransactionPort } from '@ports/in/transactions/initiate-transaction.port';
import { TransactionHistoryPort } from '@ports/in/transactions/transaction-history.port';
import { CreateTransactionRequestDto } from '@infrastructure/web/dto/create-transaction-request.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse, ApiHeader,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { UserVerifiedGuard } from '@infrastructure/web/user-verified.guard';
import { JwtGuard } from '@infrastructure/passport/guards/jwt.guard';
import { RequestUser } from '@infrastructure/passport/user.decorator';
import { PaginationDto } from '@infrastructure/web/dto/pagination.dto';
import { TransactionResponseDto } from '@infrastructure/web/dto/transaction-response.dto';
import { UserEntity } from '@domain/models/entities/user.entity';

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
  @ApiUnprocessableEntityResponse({
    description: 'Cross-currency transfers not allowed or insufficient balance',
  })
  @ApiHeader({
    name: 'X-Idempotency-Key',
    description: 'Unique UUID for transaction',
    example: 'a1d61baf-3299-4143-a523-069b8dc65671'
  })
  @ApiBadRequestResponse({ description: 'Invalid Recipient or sender' })
  @ApiConflictResponse({ description: 'Idempotency key is not unique' })
  postTransaction(
    @Headers('X-Idempotency-Key') idempotencyKey: string,
    @Body() dto: CreateTransactionRequestDto,
    @RequestUser() user: UserEntity,
  ) {
    if (user.id === dto.recipientId)
      throw new BadRequestException('You cannot make self-transfers');
    return this.initiateTransaction.initiateTransaction({
      ...dto,
      idempotencyKey,
      senderId: user.id,
      senderName: user.name,
    });
  }

  @Get()
  async getUserTransactionHistory(
    @Query() { page, perPage }: PaginationDto,
    @RequestUser() user: UserEntity,
  ): Promise<TransactionResponseDto[]> {
    return (
      await this.transactionHistory.getUserTransactionHistory(
        user.id,
        +page || 1,
        +perPage || 10,
      )
    ).map(TransactionResponseDto.fromEntity);
  }
}
