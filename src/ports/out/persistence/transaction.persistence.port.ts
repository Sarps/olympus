import { TransactionEntity } from '@domain/models/entities/transaction.entity';

export interface TransactionPersistencePort {
  save(transaction: TransactionEntity): Promise<string>;
  getUserTransactions(
    userId: string,
    page: number,
    perPage: number,
  ): Promise<TransactionEntity[]>;
}

export const TransactionPersistencePort = Symbol('TransactionPersistencePort');
