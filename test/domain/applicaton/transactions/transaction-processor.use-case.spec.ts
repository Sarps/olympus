import { Mock, Times } from 'moq.ts';
import { TransactionPersistencePort } from '@ports/out/persistence/transaction.persistence.port';
import { WalletPersistencePort } from '@ports/out/persistence/wallet.persistence.port';
import { TransactionSentEventPort } from '@ports/out/events/transaction-sent.event.port';
import { TransactionFailedEventPort } from '@ports/out/events/transaction-failed.event.port';
import { TransactionProcessorUseCase } from '@domain/application/transactions/transaction-processor.use-case';
import { TransactionEntity } from '@domain/models/entities/transaction.entity';
import { Currency } from '@domain/models/enums/currency';
import { TransactionStatus } from '@domain/models/enums/transaction-status';

describe('TransactionProcessorUseCase', () => {
  let transactionPersistence: Mock<TransactionPersistencePort>;
  let walletPersistence: Mock<WalletPersistencePort>;
  let transactionSentEvent: Mock<TransactionSentEventPort>;
  let transactionFailedEvent: Mock<TransactionFailedEventPort>;
  let underTest: TransactionProcessorUseCase;

  const transaction = TransactionEntity.newInstance(
    'senderId',
    'recipientId',
    'idempotencyKey',
    Currency.USD,
    10.0,
    'narration',
  );

  beforeEach(() => {
    transactionPersistence = new Mock<TransactionPersistencePort>();
    walletPersistence = new Mock<WalletPersistencePort>();
    transactionSentEvent = new Mock<TransactionSentEventPort>();
    transactionFailedEvent = new Mock<TransactionFailedEventPort>();
    underTest = new TransactionProcessorUseCase(
      transactionPersistence.object(),
      walletPersistence.object(),
      transactionSentEvent.object(),
      transactionFailedEvent.object(),
    );
  });

  it('should process transaction successfully', async () => {
    walletPersistence
      .setup((i) =>
        i.decreaseIncreaseBalance(
          transaction.sender.userId,
          transaction.recipient.userId,
          transaction.amount.amount,
        ),
      )
      .returnsAsync();
    transactionPersistence
      .setup((i) => i.updateStatus(transaction.id, TransactionStatus.SUCCESS))
      .returnsAsync();
    transactionSentEvent.setup((i) => i.fire(transaction)).returnsAsync();

    await underTest.process(transaction);

    transactionPersistence.verify(
      (i) => i.updateStatus(transaction.id, TransactionStatus.SUCCESS),
      Times.Once(),
    );
    transactionSentEvent.verify((i) => i.fire(transaction), Times.Once());
  });

  it('should handle transaction failure', async () => {
    walletPersistence
      .setup((i) =>
        i.decreaseIncreaseBalance(
          transaction.sender.userId,
          transaction.recipient.userId,
          transaction.amount.amount,
        ),
      )
      .throwsAsync(new Error('Internal transfer error'));
    transactionPersistence
      .setup((i) =>
        i.updateStatus(
          transaction.id,
          TransactionStatus.FAILED,
          'Internal transfer error',
        ),
      )
      .returnsAsync(undefined);
    transactionFailedEvent
      .setup((i) => i.fire(transaction))
      .returnsAsync(undefined);

    await underTest.process(transaction);

    transactionPersistence.verify(
      (i) =>
        i.updateStatus(
          transaction.id,
          TransactionStatus.FAILED,
          'Internal transfer error',
        ),
      Times.Once(),
    );
    transactionFailedEvent.verify((i) => i.fire(transaction), Times.Once());
  });
});
