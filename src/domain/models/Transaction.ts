import { Amount } from '@domain/models/Amount';
import { TransactionType } from '@domain/models/enums/TransactionType';
import { Wallet } from '@domain/models/Wallet';

export class Transaction {
  amount: Amount;
  type: TransactionType;
  wallet?: Wallet;
}
