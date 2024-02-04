import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TransactionSentProducer } from '@infrastructure/kafka/producers/transaction-sent.producer';
import { TransactionEntity } from '@domain/models/entities/transaction.entity';
import { EVENTS } from '@infrastructure/constants';
import { Currency } from '@domain/models/enums/currency';

describe('TransactionSentProducer', () => {
  let service: TransactionSentProducer;
  let mockEventEmitter: Partial<EventEmitter2>;

  beforeEach(async () => {
    mockEventEmitter = {
      emitAsync: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionSentProducer,
        { provide: EventEmitter2, useValue: mockEventEmitter },
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
    );
    payload.id = '123';

    await service.fire(payload);

    expect(mockEventEmitter.emitAsync).toHaveBeenCalledWith(EVENTS.TRANSACTION_SENT, payload);
    expect(mockEventEmitter.emitAsync).toHaveBeenCalledTimes(1);
  });
});
