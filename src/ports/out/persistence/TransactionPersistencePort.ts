import { Transaction } from '@domain/models/Transaction';

export interface TransactionPersistencePort {
  save(transaction: Transaction): Promise<void>;
  getUserTransactions(userId: string): Promise<Transaction[]>;
}
