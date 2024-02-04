import { TransactionHistoryPort } from "@ports/in/transactions/transaction-history.port";
import { TransactionEntity } from "@domain/models/entities/transaction.entity";
import { Inject } from "@nestjs/common";
import { TransactionPersistencePort } from "@ports/out/persistence/transaction.persistence.port";

export class TransactionHistoryUseCase implements TransactionHistoryPort {

  constructor(
    @Inject(TransactionPersistencePort) private transactionPersistence: TransactionPersistencePort
  ) {
  }
  getUserTransactionHistory(userId: string, page: number, perPage: number): Promise<TransactionEntity[]> {
    return this.transactionPersistence.getUserTransactions(userId, page, perPage);
  }

}
