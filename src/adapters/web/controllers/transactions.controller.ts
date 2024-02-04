import { BadRequestException, Body, Controller, Get, Inject, Post, Query, UseGuards } from "@nestjs/common";
import { InitiateTransactionPort } from "@ports/in/transactions/initiate-transaction.port";
import { TransactionHistoryPort } from "@ports/in/transactions/transaction-history.port";
import { CreateTransactionDto } from "@adapters/web/dto/create-transaction.dto";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse
} from "@nestjs/swagger";
import { UserVerifiedGuard } from "@adapters/web/user-verified.guard";
import { JwtGuard } from "@adapters/passport/guards/jwt.guard";
import { RequestUser } from "@adapters/passport/user.decorator";
import { User } from "@prisma/client";
import { PaginationDto } from "@adapters/web/dto/pagination.dto";
import { TransactionResponseDto } from "@adapters/web/dto/transaction-response.dto";

@ApiTags("Transactions")
@Controller("transactions")
@ApiUnauthorizedResponse({ description: "Unauthorized" })
@ApiForbiddenResponse({ description: "Forbidden" })
@UseGuards(JwtGuard, UserVerifiedGuard)
@ApiBearerAuth()
export class TransactionsController {
  constructor(
    @Inject(InitiateTransactionPort)
    private readonly initiateTransaction: InitiateTransactionPort,
    @Inject(TransactionHistoryPort)
    private readonly transactionHistory: TransactionHistoryPort
  ) {
  }

  @Post()
  @ApiUnprocessableEntityResponse({
    description: "Cross-currency transfers not allowed or insufficient balance"
  })
  @ApiBadRequestResponse({ description: "Invalid Recipient or sender" })
  @ApiConflictResponse({ description: "Idempotency key is not unique" })
  postTransaction(@Body() dto: CreateTransactionDto, @RequestUser() user: User) {
    if (user.id === dto.recipientId)
      throw new BadRequestException("You cannot make self-transfers");
    return this.initiateTransaction.initiateTransaction({ ...dto, senderId: user.id });
  }

  @Get()
  async getUserTransactionHistory(
    @Query() { page, perPage }: PaginationDto,
    @RequestUser() user: User
  ): Promise<TransactionResponseDto[]> {
    return (
      await this.transactionHistory.getUserTransactionHistory(
        user.id,
        +page || 1,
        +perPage || 10
      )
    ).map(TransactionResponseDto.fromEntity);
  }
}
