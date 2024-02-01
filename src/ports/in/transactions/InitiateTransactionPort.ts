import { CreateTransactionDto } from '@adapters/rest/dto/create-transaction.dto';

export interface InitiateTransactionPort {
  initiateTransaction(createTransactionDto: CreateTransactionDto);
}
