import { TransactionEntity } from '@domain/models/entities/transaction.entity';
import { ITransactionProcessor } from '@domain/services/transactions/transaction-processor.interface';
import { InitiateTransactionUseCase } from '@domain/services/transactions/initiate-transaction.use-case';

export class TransactionProcessorUseCase implements ITransactionProcessor {
  constructor(private transactionsPort: InitiateTransactionUseCase) {}

  process(transaction: TransactionEntity): Promise<void> {
    throw new Error(`Method not implemented. ${transaction}`);
  }
}
