import { PrismaService } from '@adapters/prisma/prisma.service';
import {
  TransactionEntity,
  TransactionFulfilment,
} from '@domain/models/entities/transaction.entity';
import { TransactionPersistencePort } from '@ports/out/persistence/transaction.persistence.port';
import { Injectable } from '@nestjs/common';
import {
  Currency as PrismaCurrency,
  Prisma,
  TransactionRole as PrismaRole,
  TransactionStatus as PrismaStatus,
} from '@prisma/client';
import { AmountEntity } from '@domain/models/entities/amount.entity';
import { Currency } from '@domain/models/enums/currency';
import { TransactionRole } from '@domain/models/enums/transaction-role';
import { TransactionStatus } from '@domain/models/enums/transaction-status';

const walletInclude = {
  include: {
    wallet: { include: { user: { select: { id: true, name: true } } } },
  },
};

type TransactionResult = Prisma.TransactionGetPayload<{
  include: { wallets: typeof walletInclude };
}>;

@Injectable()
export class TransactionsRepository implements TransactionPersistencePort {
  constructor(private prisma: PrismaService) {}

  async save(transaction: TransactionEntity): Promise<string> {
    const result = await this.prisma.transaction.create({
      data: this.fromModel(transaction),
      select: { id: true },
    });
    return result.id;
  }

  async getUserTransactions(
    userId: string,
    page: number,
    perPage: number,
  ): Promise<TransactionEntity[]> {
    const skip = (page - 1) * perPage;

    const transactions = await this.prisma.transaction.findMany({
      skip,
      take: perPage,
      orderBy: { createdAt: 'desc' },
      where: { wallets: { some: { wallet: { userId } } } },
      include: { wallets: walletInclude },
    });
    return transactions.map((t) => this.toModel(t, userId));
  }

  async updateStatus(
    id: string,
    status: TransactionStatus,
    statusReason?: string,
  ): Promise<void> {
    await this.prisma.transaction.update({
      where: { id },
      data: { status: PrismaStatus[status], statusReason },
    });
  }

  private toModel(
    result: TransactionResult,
    userId: string,
  ): TransactionEntity {
    return new TransactionEntity(
      result.id,
      userId,
      result.idempotencyKey,
      TransactionStatus[result.status],
      result.statusReason,
      new AmountEntity(Currency[result.currency], result.amount),
      result.wallets.map(this.toFulfilmentModel),
    );
  }

  private fromModel(
    txn: TransactionEntity,
  ): Prisma.TransactionUncheckedCreateInput {
    return {
      idempotencyKey: txn.idempotencyKey,
      amount: txn.amount.amount,
      currency: PrismaCurrency[txn.amount.currency],
      wallets: { create: txn.fulfilment.map(this.fromFulfilmentModel) },
    };
  }

  private toFulfilmentModel(
    wallet: Prisma.WalletTransactionGetPayload<typeof walletInclude>,
  ): TransactionFulfilment {
    return {
      amount: new AmountEntity(Currency[wallet.currency], wallet.amount),
      narration: wallet.narration,
      role: TransactionRole[wallet.role],
      userId: wallet.wallet.user.id,
      name: wallet.wallet.user.name,
    };
  }

  private fromFulfilmentModel({
    userId,
    role,
    narration,
    amount,
  }: TransactionFulfilment): Prisma.WalletTransactionCreateWithoutTransactionInput {
    return {
      amount: amount.amount,
      currency: PrismaCurrency[amount.currency],
      narration,
      role: PrismaRole[role],
      wallet: { connect: { userId } },
    };
  }
}
