import { Controller, Inject } from '@nestjs/common';
import { EVENTS } from '@infrastructure/constants';
import { UserEvent } from '@domain/models/events/user.event';
import { CreateUserWalletPort } from '@ports/in/wallets/create-user-wallet.port';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class CreateWalletConsumer {
  constructor(
    @Inject(CreateUserWalletPort)
    private createUserWallet: CreateUserWalletPort,
  ) {}

  @EventPattern(EVENTS.USER_VERIFIED)
  async handle(@Payload() payload: UserEvent) {
    await this.createUserWallet.createUserWallet(payload.id);
  }
}
