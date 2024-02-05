import { Test, TestingModule } from '@nestjs/testing';
import { UserVerifiedProducer } from '@infrastructure/kafka/producers/user-verified.producer';
import { EVENTS } from '@infrastructure/constants';
import { UserEvent } from '@domain/models/events/user.event';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaClientSymbol } from '@infrastructure/kafka/kafka-client.symbol';
import { of } from 'rxjs';

describe('UserVerifiedProducer', () => {
  let service: UserVerifiedProducer;
  let mockEventEmitter: Partial<ClientKafka>;

  beforeEach(async () => {
    mockEventEmitter = {
      emit: jest.fn().mockReturnValue(of(undefined)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserVerifiedProducer,
        { provide: KafkaClientSymbol, useValue: mockEventEmitter },
      ],
    }).compile();

    service = module.get<UserVerifiedProducer>(UserVerifiedProducer);
  });

  it('should emit the USER_VERIFIED event with the correct payload', async () => {
    const payload: UserEvent = {
      id: '1',
      name: 'name',
      email: 'email',
      username: 'username',
    };

    await service.fire(payload);

    expect(mockEventEmitter.emit).toHaveBeenCalledWith(
      EVENTS.USER_VERIFIED,
      payload,
    );
    expect(mockEventEmitter.emit).toHaveBeenCalledTimes(1);
  });
});
