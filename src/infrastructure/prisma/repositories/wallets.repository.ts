import { PrismaService } from '@infrastructure/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Currency as PrismaCurrency, Prisma } from '@prisma/client';
import { WalletPersistencePort } from '@ports/out/persistence/wallet.persistence.port';
import { WalletEntity } from '@domain/models/entities/wallet.entity';
import { AmountEntity } from '@domain/models/entities/amount.entity';
import { Currency } from '@domain/models/enums/Currency';

@Injectable()
export class WalletsRepository implements WalletPersistencePort {
  constructor(private prisma: PrismaService) {}

  async decreaseIncreaseBalance(
    sourceUserId: string,
    recipientUserId: string,
    amount: number,
  ): Promise<void> {
    return this.prisma.$transaction(async (tx) => {
      await tx.wallet.update({
        where: { userId: sourceUserId },
        data: { balance: { decrement: amount } },
      });
      await tx.wallet.update({
        where: { userId: recipientUserId },
        data: { balance: { increment: amount } },
      });
    });
  }

  async save(wallet: WalletEntity): Promise<void> {
    await this.prisma.wallet.create({
      data: this.fromModel(wallet),
    });
  }

  async findByUserId(userId: string): Promise<WalletEntity> {
    const result = await this.prisma.wallet.findFirstOrThrow({
      where: { userId },
    });
    return this.toModel(result);
  }

  private toModel({
    id,
    balance,
    userId,
    currency,
  }: Prisma.WalletGetPayload<any>): WalletEntity {
    return new WalletEntity(
      id,
      new AmountEntity(Currency[currency], balance),
      userId,
    );
  }

  private fromModel({
    balance,
    userId,
  }: WalletEntity): Prisma.WalletUncheckedCreateInput {
    const payload = {
      balance: balance.amount,
      currency: PrismaCurrency[balance.currency],
      userId,
    };
    return payload;
  }
}
