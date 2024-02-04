import { Test, TestingModule } from '@nestjs/testing';
import { InitiateTransactionUseCase } from '@domain/services/initiate-transaction.use-case';

describe('TransactionsService', () => {
  let service: InitiateTransactionUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TransactionsService],
    }).compile();

    service = module.get<InitiateTransactionUseCase>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
