import { Inject, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EVENTS } from '@infrastructure/constants';
import { UserEvent } from '@domain/models/events/user.event';
import { UserVerifiedEventPort } from '@ports/out/events/user-verified.event.port';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaClientSymbol } from '@infrastructure/kafka/kafka-client.symbol';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserVerifiedProducer implements UserVerifiedEventPort {
  constructor(@Inject(KafkaClientSymbol) private eventEmitter: ClientKafka) {}

  async fire(user: UserEvent): Promise<void> {
    console.log(`Published Event: ${EVENTS.USER_VERIFIED}`, user.id);
    await lastValueFrom(this.eventEmitter.emit(EVENTS.USER_VERIFIED, user));
  }
}
