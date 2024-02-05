import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { TransactionsController } from '@infrastructure/web/controllers/transactions.controller';
import { InitiateTransactionPort } from '@ports/in/transactions/initiate-transaction.port';
import { TransactionHistoryPort } from '@ports/in/transactions/transaction-history.port';
import { JwtGuard } from '@infrastructure/passport/guards/jwt.guard';
import { UserVerifiedGuard } from '@infrastructure/web/user-verified.guard';
import { CreateTransactionRequestDto } from '@infrastructure/web/dto/create-transaction-request.dto';
import { TransactionResponseDto } from '@infrastructure/web/dto/transaction-response.dto';
import { Mock } from 'moq.ts';
import { UserEntity } from '@domain/models/entities/user.entity';

describe('TransactionsController', () => {
  let controller: TransactionsController;
  const mockInitiateTransactionPort = { initiateTransaction: jest.fn() };
  const mockTransactionHistoryPort = { getUserTransactionHistory: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        {
          provide: InitiateTransactionPort,
          useValue: mockInitiateTransactionPort,
        },
        {
          provide: TransactionHistoryPort,
          useValue: mockTransactionHistoryPort,
        },
      ],
    })
      .overrideGuard(JwtGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(UserVerifiedGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  describe('postTransaction', () => {
    it('should throw BadRequestException for self-transfers', () => {
      const dto = new Mock<CreateTransactionRequestDto>()
        .setup((i) => i.recipientId)
        .returns('1');
      const user = new Mock<UserEntity>().setup((i) => i.id).returns('1');

      expect(() =>
        controller.postTransaction("idempotencyKey", dto.object(), user.object()),
      ).toThrow(BadRequestException);
    });
  });

  describe('getUserTransactionHistory', () => {
    it('should return an array of TransactionResponseDto', async () => {
      const user = new Mock<UserEntity>().setup((i) => i.id).returns('1');
      const transactionResponse: TransactionResponseDto[] = [];

      mockTransactionHistoryPort.getUserTransactionHistory.mockResolvedValue(
        transactionResponse,
      );

      const response = await controller.getUserTransactionHistory(
        { page: 1, perPage: 10 },
        user.object(),
      );

      expect(response).toEqual(transactionResponse);
      expect(
        mockTransactionHistoryPort.getUserTransactionHistory,
      ).toHaveBeenCalledWith('1', 1, 10);
    });
  });
});
