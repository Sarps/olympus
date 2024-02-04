import { TransactionEntity } from '@domain/models/entities/transaction.entity';

export interface TransactionHistoryPort {
  getUserTransactionHistory(): Promise<TransactionEntity[]>;
}
