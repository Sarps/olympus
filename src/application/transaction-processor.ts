import { Transaction } from '@domain/models/transaction';
import { TransactionsPort } from '@domain/ports/in/transactions.interface';
import { ITransactionProcessor } from '@application/transaction-processor.interface';

export class TransactionProcessorUseCase implements ITransactionProcessor {
  constructor(private transactionsPort: TransactionsPort) {}

  process(transaction: Transaction): Promise<void> {
    throw new Error(`Method not implemented. ${transaction}`);
  }
}
