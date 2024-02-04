import { AmountEntity } from '@domain/models/entities/amount.entity';
import { TransactionType } from '@domain/models/enums/TransactionType';
import { WalletEntity } from '@domain/models/entities/wallet.entity';

export class TransactionEntity {
  amount: AmountEntity;
  type: TransactionType;
  wallet?: WalletEntity;
  partner?: WalletEntity;

  get sender(): WalletEntity {
    return this.type === TransactionType.DEBIT ? this.wallet : this.partner;
  }

  get recipient(): WalletEntity {
    return this.type === TransactionType.CREDIT ? this.wallet : this.partner;
  }
}
