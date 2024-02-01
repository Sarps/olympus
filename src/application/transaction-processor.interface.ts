import { Transaction } from '@domain/models/transaction.entity';

export interface ITransactionProcessor {
  process(transaction: Transaction): Promise<void>;
}

export const ITransactionProcessor = Symbol('ITransactionProcessor');
