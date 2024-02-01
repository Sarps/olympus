import { Transaction } from "@domain/models/transaction";
import { TransactionProcessor } from "@domain/application/TransactionProcessor";

export interface TransactionsService {
  findByUserId(): Promise<Transaction[]>;

  createTransaction(transaction: Transaction): Promise<string>;

  findByIdempotencyKey(idempotencyKey: string): Promise<Transaction>;
}

export class TransactionsServiceImpl implements TransactionsService {
  constructor(private transactionProcessor: TransactionProcessor) {
  }

  async findByUserId(): Promise<Transaction[]> {
    return [];
  }

  async createTransaction(transaction: Transaction): Promise<string> {
    // TODO: Save transaction
    try {
      await this.transactionProcessor.process(transaction);
      // TODO: Update successful txn
    } catch (e) {
      // TODO: Update failed txn
    }
    return "id";
  }

  findByIdempotencyKey(_: string): Promise<Transaction> {
    return Promise.resolve(undefined);
  }
}

export const TransactionsService = Symbol("TransactionsService");
