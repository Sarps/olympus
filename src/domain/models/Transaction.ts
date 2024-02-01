import { Amount } from '@domain/models/Amount';
import { TransactionType } from '@domain/models/enums/TransactionType';
import { Wallet } from '@domain/models/Wallet';

export class Transaction {
  amount: Amount;
  type: TransactionType;
  wallet?: Wallet;
  partner?: Wallet;

  get sender(): Wallet {
    return this.type === TransactionType.DEBIT ? this.wallet : this.partner;
  }

  get recipient(): Wallet {
    return this.type === TransactionType.CREDIT ? this.wallet : this.partner;
  }
}
