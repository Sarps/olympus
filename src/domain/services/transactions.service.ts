import { TransactionsPort } from '@domain/ports/in/transactions.interface';
import { Transaction } from '@domain/models/transaction';
import { ITransactionProcessor } from '@application/transaction-processor.interface';

export class TransactionsService implements TransactionsPort {
  constructor(private transactionProcessor: ITransactionProcessor) {}
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
    return 'id';
  }

  findByIdempotencyKey(_: string): Promise<Transaction> {
    return Promise.resolve(undefined);
  }
}
