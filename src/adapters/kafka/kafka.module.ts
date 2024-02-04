import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { UserRegisteredEventPort } from "@ports/out/events/user-registered.event.port";
import { UserRegisteredProducer } from "@adapters/kafka/producers/user-registered.producer";
import { InitiateVerificationUseCase } from "@domain/services/users/initiate-verification.use-case";
import { InitiateUserVerificationPort } from "@ports/in/users/initiate-user-verification.port";
import { PrismaModule } from "@adapters/prisma/prisma.module";
import { VerifyUserConsumer } from "@adapters/kafka/consumers/verify-user.consumer";
import { UserVerifiedEventPort } from "@ports/out/events/user-verified.event.port";
import { UserVerifiedProducer } from "@adapters/kafka/producers/user-verified.producer";
import { CreateWalletConsumer } from "@adapters/kafka/consumers/create-wallet.consumer";
import { CreateUserWalletPort } from "@ports/in/wallets/create-user-wallet.port";
import { CreateUserWalletUseCase } from "@domain/services/wallets/create-user-wallet.use-case";

@Module({
  imports: [
    PrismaModule,
    EventEmitterModule.forRoot()
  ],
  providers: [
    VerifyUserConsumer,
    CreateWalletConsumer,
    { provide: UserRegisteredEventPort, useClass: UserRegisteredProducer },
    { provide: UserVerifiedEventPort, useClass: UserVerifiedProducer },
    { provide: InitiateUserVerificationPort, useClass: InitiateVerificationUseCase },
    { provide: CreateUserWalletPort, useClass: CreateUserWalletUseCase },
  ],
  exports: [
    UserRegisteredEventPort,
    UserVerifiedEventPort
  ]
})
export class KafkaModule {
}
