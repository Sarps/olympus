import { Test, TestingModule } from '@nestjs/testing';
import { UserRegisteredProducer } from '@infrastructure/kafka/producers/user-registered.producer';
import { EVENTS } from '@infrastructure/constants';
import { UserEvent } from '@domain/models/events/user.event';
import { KafkaClientSymbol } from '@infrastructure/kafka/kafka-client.symbol';
import { ClientKafka } from '@nestjs/microservices';
import { of } from 'rxjs';

describe('UserRegisteredProducer', () => {
  let service: UserRegisteredProducer;
  let mockEventEmitter: Partial<ClientKafka>;

  beforeEach(async () => {
    mockEventEmitter = {
      emit: jest.fn().mockReturnValue(of(undefined)),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRegisteredProducer,
        { provide: KafkaClientSymbol, useValue: mockEventEmitter },
      ],
    }).compile();

    service = module.get<UserRegisteredProducer>(UserRegisteredProducer);
  });

  it('should emit the USER_REGISTERED event with the correct payload', async () => {
    const payload: UserEvent = {
      id: '1',
      name: 'name',
      email: 'email',
      username: 'username',
    };

    await service.fire(payload);

    expect(mockEventEmitter.emit).toHaveBeenCalledWith(
      EVENTS.USER_REGISTERED,
      payload,
    );
    expect(mockEventEmitter.emit).toHaveBeenCalledTimes(1);
  });
});
