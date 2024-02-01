import { Transaction } from '@domain/models/transaction';

export interface ITransactionProcessor {
  process(transaction: Transaction): Promise<void>;
}

export const ITransactionProcessor = Symbol('ITransactionProcessor');
