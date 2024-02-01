import { Transaction } from '@domain/models/Transaction';

export interface NewTransactionPublisherPort {
  publish(transaction: Transaction): Promise<void>;
}
