import { TransactionEntity } from '@domain/models/entities/transaction.entity';
import { ITransactionProcessor } from '@domain/application/transactions/transaction-processor.interface';
import { Inject } from '@nestjs/common';
import { TransactionSentEventPort } from '@ports/out/events/transaction-sent.event.port';
import { TransactionFailedEventPort } from '@ports/out/events/transaction-failed.event.port';
import { TransactionPersistencePort } from '@ports/out/persistence/transaction.persistence.port';
import { TransactionStatus } from '@domain/models/enums/transaction-status';
import { WalletPersistencePort } from '@ports/out/persistence/wallet.persistence.port';

export class TransactionProcessorUseCase implements ITransactionProcessor {
  constructor(
    @Inject(TransactionPersistencePort)
    private transactionPersistence: TransactionPersistencePort,
    @Inject(WalletPersistencePort)
    private walletPersistence: WalletPersistencePort,
    @Inject(TransactionSentEventPort)
    private transactionSentEvent: TransactionSentEventPort,
    @Inject(TransactionFailedEventPort)
    private transactionFailedEvent: TransactionFailedEventPort,
  ) {}

  async process(transaction: TransactionEntity): Promise<void> {
    try {
      await this.sendTransaction(transaction);
      await this.transactionPersistence.updateStatus(
        transaction.id,
        TransactionStatus.SUCCESS,
      );
      await this.transactionSentEvent.fire(transaction);
    } catch (e) {
      await this.transactionPersistence.updateStatus(
        transaction.id,
        TransactionStatus.FAILED,
        'Internal transfer error',
      );
      await this.transactionFailedEvent.fire(transaction);
    }
  }

  async sendTransaction(transaction: TransactionEntity): Promise<void> {
    return this.walletPersistence.decreaseIncreaseBalance(
      transaction.sender.userId,
      transaction.recipient.userId,
      transaction.amount.amount,
    );
  }
}
