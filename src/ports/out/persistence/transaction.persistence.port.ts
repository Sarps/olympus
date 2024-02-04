import { TransactionEntity } from '@domain/models/entities/transaction.entity';
import { TransactionStatus } from '@domain/models/enums/transaction-status';

export interface TransactionPersistencePort {
  save(transaction: TransactionEntity): Promise<string>;
  getUserTransactions(
    userId: string,
    page: number,
    perPage: number,
  ): Promise<TransactionEntity[]>;
  updateStatus(
    id: string,
    status: TransactionStatus,
    statusReason?: string,
  ): Promise<void>;
}

export const TransactionPersistencePort = Symbol('TransactionPersistencePort');
