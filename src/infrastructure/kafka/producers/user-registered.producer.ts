import { Inject, Injectable } from '@nestjs/common';
import { UserRegisteredEventPort } from '@ports/out/events/user-registered.event.port';
import { EVENTS } from '@infrastructure/constants';
import { UserEvent } from '@domain/models/events/user.event';
import { KafkaClientSymbol } from '@infrastructure/kafka/kafka-client.symbol';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserRegisteredProducer implements UserRegisteredEventPort {
  constructor(@Inject(KafkaClientSymbol) private eventEmitter: ClientKafka) {}

  async fire(user: UserEvent): Promise<void> {
    console.log(`Published Event: ${EVENTS.USER_REGISTERED}`, user.id);
    await lastValueFrom(this.eventEmitter.emit(EVENTS.USER_REGISTERED, user));
  }
}
