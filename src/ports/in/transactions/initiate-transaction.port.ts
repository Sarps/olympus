import { CreateTransactionDto } from '@domain/models/dto/create-transaction.dto';
import { TransactionEntity } from "@domain/models/entities/transaction.entity";

export interface InitiateTransactionPort {
  initiateTransaction(createTransactionDto: CreateTransactionDto): Promise<TransactionEntity>;
}

export const InitiateTransactionPort = Symbol("InitiateTransactionPort")
