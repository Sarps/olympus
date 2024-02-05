import { Module } from '@nestjs/common';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { UserRegisteredEventPort } from '@ports/out/events/user-registered.event.port';
import { UserRegisteredProducer } from '@infrastructure/kafka/producers/user-registered.producer';
import { InitiateVerificationUseCase } from '@domain/application/users/initiate-verification.use-case';
import { InitiateUserVerificationPort } from '@ports/in/users/initiate-user-verification.port';
import { PrismaModule } from '@infrastructure/prisma/prisma.module';
import { VerifyUserConsumer } from '@infrastructure/kafka/consumers/verify-user.consumer';
import { UserVerifiedEventPort } from '@ports/out/events/user-verified.event.port';
import { UserVerifiedProducer } from '@infrastructure/kafka/producers/user-verified.producer';
import { CreateWalletConsumer } from '@infrastructure/kafka/consumers/create-wallet.consumer';
import { CreateUserWalletPort } from '@ports/in/wallets/create-user-wallet.port';
import { CreateUserWalletUseCase } from '@domain/application/wallets/create-user-wallet.use-case';
import { TransactionSentEventPort } from '@ports/out/events/transaction-sent.event.port';
import { TransactionFailedEventPort } from '@ports/out/events/transaction-failed.event.port';
import { TransactionSentProducer } from '@infrastructure/kafka/producers/transaction-sent.producer';
import { TransactionFailedProducer } from '@infrastructure/kafka/producers/transaction-failed.producer';
import { SmtpModule } from '@infrastructure/smtp/smtp.module';
import { TransactionReceivedConsumer } from '@infrastructure/kafka/consumers/transaction-received.consumer';

@Module({
  imports: [SmtpModule, PrismaModule, EventEmitterModule.forRoot()],
  providers: [
    VerifyUserConsumer,
    CreateWalletConsumer,
    TransactionReceivedConsumer,
    { provide: UserRegisteredEventPort, useClass: UserRegisteredProducer },
    { provide: UserVerifiedEventPort, useClass: UserVerifiedProducer },
    { provide: TransactionSentEventPort, useClass: TransactionSentProducer },
    {
      provide: TransactionFailedEventPort,
      useClass: TransactionFailedProducer,
    },
    {
      provide: InitiateUserVerificationPort,
      useClass: InitiateVerificationUseCase,
    },
    { provide: CreateUserWalletPort, useClass: CreateUserWalletUseCase },
  ],
  exports: [
    UserRegisteredEventPort,
    UserVerifiedEventPort,
    TransactionSentEventPort,
    TransactionFailedEventPort,
  ],
})
export class KafkaModule {}
