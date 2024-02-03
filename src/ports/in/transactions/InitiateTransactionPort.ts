import { CreateTransactionDto } from '@domain/models/dto/create-transaction.dto';

export interface InitiateTransactionPort {
  initiateTransaction(createTransactionDto: CreateTransactionDto);
}
