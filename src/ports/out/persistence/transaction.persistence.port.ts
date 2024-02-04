import { TransactionEntity } from '@domain/models/entities/transaction.entity';

export interface TransactionPersistencePort {
  save(transactions: TransactionEntity[]): Promise<void>;
  getUserTransactions(userId: string, page: number, perPage: number): Promise<TransactionEntity[]>;
}

export const TransactionPersistencePort = Symbol('TransactionPersistencePort');
