import { TransactionEntity } from '@domain/models/entities/transaction.entity';

export interface TransactionHistoryPort {
  getUserTransactionHistory(
    userId: string,
    page: number,
    perPage: number,
  ): Promise<TransactionEntity[]>;
}

export const TransactionHistoryPort = Symbol('TransactionHistoryPort');
