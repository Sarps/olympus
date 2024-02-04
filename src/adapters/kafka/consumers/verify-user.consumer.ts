import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EVENTS } from '@adapters/constants';
import { UserEvent } from '@domain/models/events/UserEvent';
import { InitiateUserVerificationPort } from '@ports/in/users/initiate-user-verification.port';

@Injectable()
export class VerifyUserConsumer {
  constructor(
    @Inject(InitiateUserVerificationPort)
    private initiateUserVerification: InitiateUserVerificationPort,
  ) {}

  @OnEvent(EVENTS.USER_REGISTERED, { async: true })
  async handle(payload: UserEvent) {
    await this.initiateUserVerification.initiateVerification(
      payload.id,
      payload.email,
    );
  }
}
