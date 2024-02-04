import { Currency } from '@domain/models/enums/Currency';

export class AmountEntity {
  constructor(public currency: Currency, public amount: number) {
  }
}
