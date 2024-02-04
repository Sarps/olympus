import { AmountEntity } from '@domain/models/entities/amount.entity';
import { TransactionStatus } from '@domain/models/enums/transaction-status';
import { TransactionType } from '@domain/models/enums/transaction-type';
import { TransactionEntity } from '@domain/models/entities/transaction.entity';

export class TransactionPartyDto {
  constructor(
    public narration: string,
    public userId: string,
    public name: string,
  ) {}
}

export class TransactionResponseDto {
  constructor(
    public id: string,
    public amount: AmountEntity,
    public status: TransactionStatus,
    public statusReason: string | undefined,
    public type: TransactionType,
    public narration: string,
    public sender: TransactionPartyDto | undefined,
    public recipient: TransactionPartyDto | undefined,
  ) {}

  static fromEntity(entity: TransactionEntity): TransactionResponseDto {
    const type = entity.type,
      sender = entity.sender,
      recipient = entity.recipient;
    return new TransactionResponseDto(
      entity.id,
      type === TransactionType.DEBIT ? sender.amount : recipient.amount,
      entity.status,
      !!entity.statusReason ? entity.statusReason : undefined,
      type,
      type === TransactionType.DEBIT ? sender.narration : recipient.narration,
      type === TransactionType.CREDIT
        ? new TransactionPartyDto(sender.narration, sender.userId, sender.name)
        : undefined,
      type === TransactionType.DEBIT
        ? new TransactionPartyDto(
            recipient.narration,
            recipient.userId,
            recipient.name,
          )
        : undefined,
    );
  }
}
