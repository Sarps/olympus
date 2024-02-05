import { Controller, Inject } from '@nestjs/common';
import { EVENTS } from '@infrastructure/constants';
import { UserEvent } from '@domain/models/events/user.event';
import { InitiateUserVerificationPort } from '@ports/in/users/initiate-user-verification.port';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class VerifyUserConsumer {
  constructor(
    @Inject(InitiateUserVerificationPort)
    private initiateUserVerification: InitiateUserVerificationPort,
  ) {}

  @EventPattern(EVENTS.USER_REGISTERED)
  async handle(@Payload() payload: UserEvent) {
    await this.initiateUserVerification.initiateVerification(
      payload.id,
      payload.email,
    );
  }
}
