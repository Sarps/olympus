import { TransactionEntity } from '@domain/models/entities/transaction.entity';

export interface ITransactionProcessor {
  process(transaction: TransactionEntity): Promise<void>;
}

export const ITransactionProcessor = Symbol('ITransactionProcessor');
