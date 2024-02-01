import { Amount } from '@domain/models/Amount';
import { User } from '@domain/models/User';

export class Wallet {
  id: string;
  balance: Amount;
  user?: User;
}
