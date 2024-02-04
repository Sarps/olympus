import { Mock } from 'moq.ts';
import { TransactionPersistencePort } from '@ports/out/persistence/transaction.persistence.port';
import { TransactionHistoryUseCase } from '@domain/application/transactions/transaction-history.use-case';
import { TransactionEntity } from '@domain/models/entities/transaction.entity';

describe('TransactionHistoryUseCase', () => {
  let transactionPersistence: Mock<TransactionPersistencePort>;
  let underTest: TransactionHistoryUseCase;

  const userId = 'testUserId';
  const transactions = [
    new Mock<TransactionEntity>().object(),
    new Mock<TransactionEntity>().object(),
  ];

  beforeEach(() => {
    transactionPersistence = new Mock<TransactionPersistencePort>();
    underTest = new TransactionHistoryUseCase(transactionPersistence.object());
  });

  it('should retrieve user transaction history', async () => {
    const page = 1;
    const perPage = 10;

    transactionPersistence
      .setup(i => i.getUserTransactions(userId, page, perPage))
      .returnsAsync(transactions);

    const result = await underTest.getUserTransactionHistory(userId, page, perPage);

    expect(result).toEqual(transactions);
    expect(result.length).toBe(transactions.length);
  });

  it('should handle pagination correctly', async () => {
    const page = 2;
    const perPage = 5;
    
    const paginatedTransactions = [
      new Mock<TransactionEntity>().object(),
      new Mock<TransactionEntity>().object(),
    ];

    transactionPersistence
      .setup(i => i.getUserTransactions(userId, page, perPage))
      .returnsAsync(paginatedTransactions);

    const result = await underTest.getUserTransactionHistory(userId, page, perPage);

    expect(result).toEqual(paginatedTransactions);
    expect(result.length).toBe(paginatedTransactions.length);
  });
});
