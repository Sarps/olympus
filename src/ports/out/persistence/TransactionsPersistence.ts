import { Transaction } from '@domain/models/Transaction';

export interface ITransactionsPersistencePort {
  save(transaction: Transaction): Promise<void>;
  getUserTransactions(userId: string): Promise<Transaction[]>;
}
