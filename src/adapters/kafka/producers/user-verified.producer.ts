import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { EVENTS } from '@adapters/constants';
import { UserEvent } from '@domain/models/events/UserEvent';
import { UserVerifiedEventPort } from '@ports/out/events/user-verified.event.port';

@Injectable()
export class UserVerifiedProducer implements UserVerifiedEventPort {
  constructor(private eventEmitter: EventEmitter2) {}

  async fire(user: UserEvent): Promise<void> {
    console.log(`Published Event: ${EVENTS.USER_VERIFIED}`, user.id);
    await this.eventEmitter.emitAsync(EVENTS.USER_VERIFIED, user);
  }
}
