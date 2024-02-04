import { TransactionEntity } from '@domain/models/entities/transaction.entity';

export interface TransactionSentEventPort {
  fire(transaction: TransactionEntity): Promise<void>;
}

export const TransactionSentEventPort = Symbol('TransactionSentEventPort');
