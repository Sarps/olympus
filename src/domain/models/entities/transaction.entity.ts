import { AmountEntity } from '@domain/models/entities/amount.entity';
import { TransactionType } from '@domain/models/enums/transaction-type';
import { TransactionRole } from '@domain/models/enums/transaction-role';
import { Currency } from '@domain/models/enums/currency';

export type TransactionFulfilment = {
  role: TransactionRole;
  narration: string;
  userId: string;
  amount: AmountEntity;
};

export class TransactionEntity {
  constructor(
    public id: string | null,
    public userId: string,
    public idempotencyKey: string,
    public amount: AmountEntity,
    public fulfilment: TransactionFulfilment[],
  ) {}

  static newInstance(
    senderId: string,
    recipientId: string,
    idempotencyKey: string,
    currency: Currency,
    amountValue: number,
    narration: string,
    recipientNarration?: string,
  ): TransactionEntity {
    const amount = new AmountEntity(currency, amountValue);
    return new TransactionEntity(null, senderId, idempotencyKey, amount, [
      { role: TransactionRole.SENDER, amount, userId: senderId, narration },
      {
        role: TransactionRole.RECIPIENT,
        amount,
        userId: recipientId,
        narration: recipientNarration || narration,
      },
    ]);
  }

  get sender(): TransactionFulfilment {
    return this.findByRole(TransactionRole.SENDER);
  }

  get recipient(): TransactionFulfilment {
    return this.findByRole(TransactionRole.RECIPIENT);
  }

  get fee(): TransactionFulfilment {
    return this.findByRole(TransactionRole.FEE);
  }

  private findByRole(role: TransactionRole) {
    return this.fulfilment.find((fulfillment) => fulfillment.role === role);
  }

  get type(): TransactionType {
    return this.sender.userId === this.userId
      ? TransactionType.DEBIT
      : TransactionType.CREDIT;
  }
}
