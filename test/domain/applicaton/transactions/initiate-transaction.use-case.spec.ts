import { It, Mock, Times } from 'moq.ts';
import { WalletPersistencePort } from '@ports/out/persistence/wallet.persistence.port';
import { TransactionPersistencePort } from '@ports/out/persistence/transaction.persistence.port';
import { ITransactionProcessor } from '@domain/application/transactions/transaction-processor.interface';
import { InitiateTransactionUseCase } from '@domain/application/transactions/initiate-transaction.use-case';
import { Currency } from '@domain/models/enums/currency';
import {
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InitiateTransaction } from '@ports/in/transactions/initiate-transaction.port';
import { WalletEntity } from '@domain/models/entities/wallet.entity';

describe('InitiateTransactionUseCase', () => {
  let walletPersistence: Mock<WalletPersistencePort>;
  let transactionPersistence: Mock<TransactionPersistencePort>;
  let transactionProcessor: Mock<ITransactionProcessor>;
  let underTest: InitiateTransactionUseCase;

  const payload: InitiateTransaction = {
    senderId: 'senderId',
    senderName: 'senderName',
    recipientId: 'recipientId',
    idempotencyKey: 'idempotencyKey',
    amount: 100,
    narration: 'Test transaction',
  };

  const sender = new WalletEntity(
    null,
    { amount: 500, currency: Currency.USD },
    'senderId',
  );
  const recipient = new WalletEntity(
    null,
    { amount: 200, currency: Currency.USD },
    'recipientId',
  );

  beforeEach(() => {
    walletPersistence = new Mock<WalletPersistencePort>();
    transactionPersistence = new Mock<TransactionPersistencePort>();
    transactionProcessor = new Mock<ITransactionProcessor>();
    underTest = new InitiateTransactionUseCase(
      walletPersistence.object(),
      transactionPersistence.object(),
      transactionProcessor.object(),
    );
  });

  it('should initiate transaction successfully', async () => {
    walletPersistence
      .setup((i) => i.findByUserId(payload.senderId))
      .returnsAsync(sender);
    walletPersistence
      .setup((i) => i.findByUserId(payload.recipientId))
      .returnsAsync(recipient);
    transactionPersistence
      .setup((i) => i.save(It.IsAny()))
      .returnsAsync('transactionId');
    transactionProcessor.setup((i) => i.process(It.IsAny())).returnsAsync();

    await underTest.initiateTransaction(payload);

    transactionProcessor.verify((i) => i.process(It.IsAny()), Times.Once());
  });

  // it('should throw ConflictException if idempotency key already used', async () => {
  //   const error = new Mock<Prisma.PrismaClientKnownRequestError>()
  //     .setup(i => i.code)
  //     .returns('P2002');
  //   walletPersistence
  //     .setup(i => i.findByUserId(payload.senderId))
  //     .returnsAsync(sender);
  //   walletPersistence
  //     .setup(i => i.findByUserId(payload.recipientId))
  //     .returnsAsync(recipient);
  //   transactionProcessor
  //     .setup(i => i.process(It.IsAny()))
  //     .returnsAsync();
  //   transactionPersistence
  //     .setup((i) => i.save(It.IsAny()))
  //     .throwsAsync(error.object());
  //
  //   await expect(underTest.initiateTransaction(payload)).rejects.toThrow(
  //     ConflictException,
  //   );
  // });

  it('should throw BadRequestException if sender or recipient does not exist', async () => {
    walletPersistence
      .setup((i) => i.findByUserId(It.IsAny()))
      .throwsAsync(new Error());

    await expect(() => underTest.initiateTransaction(payload)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw UnprocessableEntityException if sender has insufficient balance', async () => {
    const insufficientSender = {
      ...sender,
      balance: { amount: 50, currency: Currency.USD },
    };
    walletPersistence
      .setup((i) => i.findByUserId(payload.senderId))
      .returnsAsync(insufficientSender);
    walletPersistence
      .setup((i) => i.findByUserId(payload.recipientId))
      .returnsAsync(recipient);

    await expect(() => underTest.initiateTransaction(payload)).rejects.toThrow(
      UnprocessableEntityException,
    );
  });

  it('should throw UnprocessableEntityException if sender and recipient have different currencies', async () => {
    const differentCurrencyRecipient = {
      ...recipient,
      balance: { amount: 200, currency: Currency.EUR },
    };
    walletPersistence
      .setup((i) => i.findByUserId(payload.senderId))
      .returnsAsync(sender);
    walletPersistence
      .setup((i) => i.findByUserId(payload.recipientId))
      .returnsAsync(differentCurrencyRecipient);

    await expect(() => underTest.initiateTransaction(payload)).rejects.toThrow(
      UnprocessableEntityException,
    );
  });
});
