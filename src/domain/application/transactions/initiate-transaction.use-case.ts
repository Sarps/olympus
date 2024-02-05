import { TransactionEntity } from '@domain/models/entities/transaction.entity';
import { ITransactionProcessor } from '@domain/application/transactions/transaction-processor.interface';
import {
  InitiateTransaction,
  InitiateTransactionPort,
} from '@ports/in/transactions/initiate-transaction.port';
import {
  BadRequestException,
  ConflictException,
  Inject,
  UnprocessableEntityException,
} from '@nestjs/common';
import { WalletPersistencePort } from '@ports/out/persistence/wallet.persistence.port';
import { Currency } from '@domain/models/enums/currency';
import { TransactionPersistencePort } from '@ports/out/persistence/transaction.persistence.port';
import { Prisma } from '@prisma/client';

export class InitiateTransactionUseCase implements InitiateTransactionPort {
  constructor(
    @Inject(WalletPersistencePort)
    private walletPersistence: WalletPersistencePort,
    @Inject(TransactionPersistencePort)
    private transactionPersistence: TransactionPersistencePort,
    @Inject(ITransactionProcessor)
    private transactionProcessor: ITransactionProcessor,
  ) {}

  async initiateTransaction(payload: InitiateTransaction): Promise<void> {
    const transaction = TransactionEntity.newInstance(
      payload.senderId,
      payload.recipientId,
      payload.idempotencyKey,
      await this.getWalletCurrency(
        payload.senderId,
        payload.recipientId,
        payload.amount,
      ),
      payload.amount,
      payload.narration,
      payload.senderName,
      payload.recipientNarration,
    );
    try {
      transaction.id = await this.transactionPersistence.save(transaction);
      await this.transactionProcessor.process(transaction);
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === 'P2002'
      )
        throw new ConflictException('Idempotency key already used');
    }
  }

  private async getWalletCurrency(
    senderId: string,
    recipientId: string,
    amount: number,
  ): Promise<Currency> {
    let sender, recipient;
    try {
      [sender, recipient] = await Promise.all([
        this.walletPersistence.findByUserId(senderId),
        this.walletPersistence.findByUserId(recipientId),
      ]);
    } catch (e) {
      console.log(e)
      throw new BadRequestException(
        'Provided recipient does not exist or unverified',
      );
    }
    if (sender.balance.amount < amount)
      throw new UnprocessableEntityException('Insufficient user balance');
    if (sender.balance.currency !== recipient.balance.currency)
      throw new UnprocessableEntityException(
        'Cross-currency transfer is not unsupported',
      );
    return sender.balance.currency;
  }
}
