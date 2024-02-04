import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EVENTS } from '@infrastructure/constants';
import { TransactionEntity } from '@domain/models/entities/transaction.entity';
import { TransactionFailedEventPort } from '@ports/out/events/transaction-failed.event.port';

@Injectable()
export class TransactionFailedProducer implements TransactionFailedEventPort {
  constructor(private eventEmitter: EventEmitter2) {}

  async fire(payload: TransactionEntity): Promise<void> {
    console.log(`Published Event: ${EVENTS.TRANSACTION_FAILED}`, payload.id);
    await this.eventEmitter.emitAsync(EVENTS.TRANSACTION_FAILED, payload);
  }
}
