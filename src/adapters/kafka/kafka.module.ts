import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { UserRegisteredEventPort } from "@ports/out/events/user-registered.event.port";
import { UserRegisteredProducer } from "@adapters/kafka/producers/user-registered.producer";
import { InitiateUserVerificationUseCase } from "@domain/services/initiate-user-verification.use-case";
import { InitiateUserVerificationPort } from "@ports/in/users/initiate-user-verification.port";
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
    { provide: InitiateUserVerificationPort, useClass: InitiateUserVerificationUseCase },
  ],
  exports: [
    UserRegisteredEventPort
  ]
})
export class KafkaModule {
}
