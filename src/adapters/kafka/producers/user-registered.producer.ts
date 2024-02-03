import { Injectable } from "@nestjs/common";
import { UserRegisteredEventPort } from "@ports/out/events/UserRegisteredEventPort";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { EVENTS } from "@adapters/constants";
import { UserEvent } from "@domain/models/events/UserEvent";

@Injectable()
export class UserRegisteredProducer implements UserRegisteredEventPort {
  constructor(private eventEmitter: EventEmitter2) {
  }

  async fire(user: UserEvent): Promise<void> {
    console.log(`Published Event: ${EVENTS.USER_REGISTERED}`, user);
    await this.eventEmitter.emitAsync(EVENTS.USER_REGISTERED, user);
  }

}
