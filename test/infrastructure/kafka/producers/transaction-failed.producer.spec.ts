import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TransactionFailedProducer } from '@infrastructure/kafka/producers/transaction-failed.producer';
import { TransactionEntity } from '@domain/models/entities/transaction.entity';
import { EVENTS } from '@infrastructure/constants';
import { Currency } from '@domain/models/enums/currency';

describe('TransactionFailedProducer', () => {
  let service: TransactionFailedProducer;
  let mockEventEmitter: Partial<EventEmitter2>;

  beforeEach(async () => {
    mockEventEmitter = {
      emitAsync: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionFailedProducer,
        { provide: EventEmitter2, useValue: mockEventEmitter },
      ],
    }).compile();

    service = module.get<TransactionFailedProducer>(TransactionFailedProducer);
  });

  it('should emit the TRANSACTION_FAILED event with the correct payload', async () => {
    const payload = TransactionEntity.newInstance(
      'senderId',
      'recipientId',
      'idempotencyKey',
      Currency.USD,
      100,
      'narration',
      'senderName'
    );
    payload.id = '123';

    await service.fire(payload);

    expect(mockEventEmitter.emitAsync).toHaveBeenCalledWith(EVENTS.TRANSACTION_FAILED, payload);
    expect(mockEventEmitter.emitAsync).toHaveBeenCalledTimes(1);
  });
});
