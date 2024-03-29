import { AmountEntity } from '@domain/models/entities/amount.entity';
import { Currency } from '@domain/models/enums/Currency';
import { INITIAL_WALLET_BALANCE } from '@infrastructure/constants';

export class WalletEntity {
  constructor(
    public id: string | null,
    public balance: AmountEntity,
    public userId: string,
  ) {}

  static newInstance(userId: string) {
    return new WalletEntity(
      null,
      new AmountEntity(Currency.USD, INITIAL_WALLET_BALANCE),
      userId,
    );
  }
}
