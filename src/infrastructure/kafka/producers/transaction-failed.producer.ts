import { Inject, Injectable } from '@nestjs/common';
import { EVENTS } from '@infrastructure/constants';
import { TransactionEntity } from '@domain/models/entities/transaction.entity';
import { TransactionFailedEventPort } from '@ports/out/events/transaction-failed.event.port';
import { lastValueFrom } from 'rxjs';
import { KafkaClientSymbol } from '@infrastructure/kafka/kafka-client.symbol';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class TransactionFailedProducer implements TransactionFailedEventPort {
  constructor(@Inject(KafkaClientSymbol) private eventEmitter: ClientKafka) {}

  async fire(payload: TransactionEntity): Promise<void> {
    console.log(`Published Event: ${EVENTS.TRANSACTION_FAILED}`, payload.id);
    await lastValueFrom(
      this.eventEmitter.emit(EVENTS.TRANSACTION_FAILED, payload),
    );
  }
}
