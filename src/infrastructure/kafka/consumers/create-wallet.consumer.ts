import { Inject, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EVENTS } from '@infrastructure/constants';
import { UserEvent } from '@domain/models/events/user.event';
import { CreateUserWalletPort } from '@ports/in/wallets/create-user-wallet.port';

@Injectable()
export class CreateWalletConsumer {
  constructor(
    @Inject(CreateUserWalletPort)
    private createUserWallet: CreateUserWalletPort,
  ) {}

  @OnEvent(EVENTS.USER_VERIFIED, { async: true })
  async handle(payload: UserEvent) {
    await this.createUserWallet.createUserWallet(payload.id);
  }
}
