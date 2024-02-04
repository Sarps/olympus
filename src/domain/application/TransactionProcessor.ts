import { TransactionEntity } from '@domain/models/entities/transaction.entity';
import { TransactionsService } from '@domain/services/transactions.service';

export interface TransactionProcessor {
  process(transaction: TransactionEntity): Promise<void>;
}

export class TransactionProcessorUseCase implements TransactionProcessor {
  constructor(private transactionsPort: TransactionsService) {}

  process(transaction: TransactionEntity): Promise<void> {
    throw new Error(`Method not implemented. ${transaction}`);
  }
}

export const TransactionProcessor = Symbol('TransactionProcessor');
