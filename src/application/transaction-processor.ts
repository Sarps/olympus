import { Transaction } from '@domain/models/transaction.entity';
import { TransactionsPort } from '@domain/ports/in/transaction.interface';
import { ITransactionProcessor } from '@application/transaction-processor.interface';

export class TransactionProcessorUseCase implements ITransactionProcessor {
  constructor(private transactionsPort: TransactionsPort) {}

  process(transaction: Transaction): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
