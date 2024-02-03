import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { UserRegisteredEventPort } from "@ports/out/events/UserRegisteredEventPort";
import { UserRegisteredProducer } from "@adapters/kafka/producers/user-registered.producer";
import { InitiateUserVerification } from "@domain/services/InitiateUserVerification";
import { InitiateUserVerificationPort } from "@ports/in/users/InitiateUserVerificationPort";
import { PrismaModule } from "@adapters/prisma/prisma.module";
import { VerifyUserConsumer } from "@adapters/kafka/consumers/verify-user.consumer";

@Module({
  imports: [
    PrismaModule,
    EventEmitterModule.forRoot()
  ],
  providers: [
    VerifyUserConsumer,
    { provide: UserRegisteredEventPort, useClass: UserRegisteredProducer },
    { provide: InitiateUserVerificationPort, useClass: InitiateUserVerification },
  ],
  exports: [
    UserRegisteredEventPort
  ]
})
export class KafkaModule {
}
