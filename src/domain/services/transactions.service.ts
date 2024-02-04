import { TransactionEntity } from '@domain/models/entities/transaction.entity';
import { TransactionProcessor } from '@domain/application/TransactionProcessor';

export interface TransactionsService {
  findByUserId(): Promise<TransactionEntity[]>;

  createTransaction(transaction: TransactionEntity): Promise<string>;

  findByIdempotencyKey(idempotencyKey: string): Promise<TransactionEntity>;
}

export class TransactionsServiceImpl implements TransactionsService {
  constructor(private transactionProcessor: TransactionProcessor) {}

  async findByUserId(): Promise<TransactionEntity[]> {
    return [];
  }

  async createTransaction(transaction: TransactionEntity): Promise<string> {
    // TODO: Save transaction
    try {
      await this.transactionProcessor.process(transaction);
      // TODO: Update successful txn
    } catch (e) {
      // TODO: Update failed txn
    }
    return 'id';
  }

  findByIdempotencyKey(_: string): Promise<TransactionEntity> {
    return Promise.resolve(undefined);
  }
}

export const TransactionsService = Symbol('TransactionsService');
