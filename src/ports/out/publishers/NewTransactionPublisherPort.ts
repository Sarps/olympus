import { TransactionEntity } from '@domain/models/entities/transaction.entity';

export interface NewTransactionPublisherPort {
  publish(transaction: TransactionEntity): Promise<void>;
}
