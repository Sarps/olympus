import { Controller, Inject } from '@nestjs/common';
import { EVENTS } from '@infrastructure/constants';
import { TransactionReceivedEmailer } from '@infrastructure/smtp/emailers/transaction-received.emailer';
import { TransactionEntity } from '@domain/models/entities/transaction.entity';
import { UserPersistencePort } from '@ports/out/persistence/user.persistence.port';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class TransactionReceivedConsumer {
  constructor(
    @Inject(TransactionReceivedEmailer)
    private transactionReceivedEmailer: TransactionReceivedEmailer,
    @Inject(UserPersistencePort)
    private userPersistence: UserPersistencePort,
  ) {}

  @EventPattern(EVENTS.TRANSACTION_SENT)
  async handle(payload: TransactionEntity) {
    const user = await this.userPersistence.findById(payload.recipient.userId);
    await this.transactionReceivedEmailer.notify(user.email, payload);
  }
}
