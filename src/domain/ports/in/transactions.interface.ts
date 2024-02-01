import { Transaction } from '@domain/models/transaction';

export interface TransactionsPort {
  findByUserId(): Promise<Transaction[]>;
  createTransaction(transaction: Transaction): Promise<string>;
  findByIdempotencyKey(idempotencyKey: string): Promise<Transaction>;
}

export const TransactionsPort = Symbol('TransactionsPort');
