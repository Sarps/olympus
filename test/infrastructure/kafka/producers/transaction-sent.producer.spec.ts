import { Test, TestingModule } from '@nestjs/testing';
import { TransactionSentProducer } from '@infrastructure/kafka/producers/transaction-sent.producer';
import { TransactionEntity } from '@domain/models/entities/transaction.entity';
import { EVENTS } from '@infrastructure/constants';
import { Currency } from '@domain/models/enums/currency';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaClientSymbol } from '@infrastructure/kafka/kafka-client.symbol';
import { of } from 'rxjs';

describe('TransactionSentProducer', () => {
  let service: TransactionSentProducer;
  let mockEventEmitter: Partial<ClientKafka>;

  beforeEach(async () => {
    mockEventEmitter = {
      emit: jest.fn().mockReturnValue(of(undefined)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionSentProducer,
        { provide: KafkaClientSymbol, useValue: mockEventEmitter },
      ],
    }).compile();

    service = module.get<TransactionSentProducer>(TransactionSentProducer);
  });

  it('should emit the TRANSACTION_SENT event with the correct payload', async () => {
    const payload = TransactionEntity.newInstance(
      'senderId',
      'recipientId',
      'idempotencyKey',
      Currency.USD,
      100,
      'narration',
      'senderName',
    );
    payload.id = '123';

    await service.fire(payload);

    expect(mockEventEmitter.emit).toHaveBeenCalledWith(
      EVENTS.TRANSACTION_SENT,
      payload,
    );
    expect(mockEventEmitter.emit).toHaveBeenCalledTimes(1);
  });
});
