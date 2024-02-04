import { PrismaService } from "@adapters/prisma/prisma.service";
import { TransactionEntity } from "@domain/models/entities/transaction.entity";
import { TransactionPersistencePort } from "@ports/out/persistence/transaction.persistence.port";
import { Injectable } from "@nestjs/common";

@Injectable()
export class TransactionsRepository implements TransactionPersistencePort {
  constructor(private prisma: PrismaService) {
  }

  async save(transactions: TransactionEntity[]): Promise<void> {
    await this.prisma.transaction.createMany({
      data: transactions.map((t) => this.fromModel(t))
    });
  }

  async getUserTransactions(userId: string, page: number, perPage: number): Promise<TransactionEntity[]> {
    const skip = (page - 1) * perPage;

    const transactions = await this.prisma.transaction.findMany({
      skip,
      take: perPage,
      orderBy: {createdAt: 'desc'},
      where: { wallets: { some: { wallet: { userId } } } },
      include: { wallets: { include: { wallet: { include: { user: true } } } } }
    });
    console.log(transactions)
    return transactions.map((t) => this.toModel(t));
  }

  private toModel(transaction: any): TransactionEntity {
    return new TransactionEntity();
  }

  private fromModel(transaction: TransactionEntity): any {
  }
}
