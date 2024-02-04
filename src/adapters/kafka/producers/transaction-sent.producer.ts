import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EVENTS } from '@adapters/constants';
import { TransactionEntity } from '@domain/models/entities/transaction.entity';
import { TransactionSentEventPort } from '@ports/out/events/transaction-sent.event.port';

@Injectable()
export class TransactionSentProducer implements TransactionSentEventPort {
  constructor(private eventEmitter: EventEmitter2) {}

  async fire(payload: TransactionEntity): Promise<void> {
    console.log(`Published Event: ${EVENTS.TRANSACTION_SENT}`, payload.id);
    await this.eventEmitter.emitAsync(EVENTS.TRANSACTION_SENT, payload);
  }
}
