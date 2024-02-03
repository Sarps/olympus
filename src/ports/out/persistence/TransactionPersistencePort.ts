import { Transaction } from '@domain/models/Transaction';

export interface TransactionPersistencePort {
  save(transactions: Transaction[]): Promise<void>;
  getUserTransactions(userId: string): Promise<Transaction[]>;
}

export const TransactionPersistencePort = Symbol("TransactionPersistencePort")
