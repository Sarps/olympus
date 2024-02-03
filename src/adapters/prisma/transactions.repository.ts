import { PrismaService } from '@adapters/prisma/prisma.service';
import { Transaction } from '@domain/models/transaction';
import { TransactionPersistencePort } from '@ports/out/persistence/TransactionPersistencePort';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionsRepository implements TransactionPersistencePort {
  constructor(private prisma: PrismaService) {}

  async save(transactions: Transaction[]): Promise<void> {
    await this.prisma.transaction.createMany({
      data: transactions.map((t) => this.fromModel(t)),
    });
  }

  async getUserTransactions(userId: string): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: { wallet: { userId } },
    });
    return transactions.map((t) => this.toModel(t));
  }

  private toModel(transaction: any): Transaction {
    return new Transaction();
  }

  private fromModel(transaction: Transaction): any {}
}
