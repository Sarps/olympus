import { TransactionEntity } from '@domain/models/entities/transaction.entity';

export interface TransactionFailedEventPort {
  fire(transaction: TransactionEntity): Promise<void>;
}

export const TransactionFailedEventPort = Symbol('TransactionFailedEventPort');
