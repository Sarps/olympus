import { Transaction } from '@domain/models/transaction';
import { TransactionsService } from '@domain/services/transactions.service';
import { ITransactionProcessor } from '@domain/application/transaction-processor.interface';

export class TransactionProcessorUseCase implements ITransactionProcessor {
  constructor(private transactionsPort: TransactionsService) {}

  process(transaction: Transaction): Promise<void> {
    throw new Error(`Method not implemented. ${transaction}`);
  }
}
