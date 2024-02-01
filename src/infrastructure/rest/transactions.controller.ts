import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionsPort } from '@domain/ports/in/transaction.interface';

@Controller('transactions')
export class TransactionsController {
  constructor(
    @Inject(TransactionsPort)
    private readonly transactionsPort: TransactionsPort,
  ) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsPort.createTransaction(createTransactionDto);
  }

  @Get()
  findAll() {
    return this.transactionsPort.findByUserId();
  }
}
