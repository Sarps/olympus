import { Transaction } from '@domain/models/transaction';
import { TransactionsService } from '@domain/services/transactions.service';

export interface TransactionProcessor {
  process(transaction: Transaction): Promise<void>;
}

export class TransactionProcessorUseCase implements TransactionProcessor {
  constructor(private transactionsPort: TransactionsService) {}

  process(transaction: Transaction): Promise<void> {
    throw new Error(`Method not implemented. ${transaction}`);
  }
}

export const TransactionProcessor = Symbol('TransactionProcessor');
