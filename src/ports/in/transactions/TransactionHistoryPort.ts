import { Transaction } from '@domain/models/Transaction';

export interface TransactionHistoryPort {
  getUserTransactionHistory(): Promise<Transaction[]>;
}
