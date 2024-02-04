import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserRegisteredProducer } from '@infrastructure/kafka/producers/user-registered.producer';
import { EVENTS } from '@infrastructure/constants';
import { UserEvent } from '@domain/models/events/user.event';

describe('UserRegisteredProducer', () => {
  let service: UserRegisteredProducer;
  let mockEventEmitter: Partial<EventEmitter2>;

  beforeEach(async () => {
    mockEventEmitter = {
      emitAsync: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRegisteredProducer,
        { provide: EventEmitter2, useValue: mockEventEmitter },
      ],
    }).compile();

    service = module.get<UserRegisteredProducer>(UserRegisteredProducer);
  });

  it('should emit the USER_REGISTERED event with the correct payload', async () => {
    const payload: UserEvent = { id: '1', name: 'name', email: 'email', username: 'username' };

    await service.fire(payload);

    expect(mockEventEmitter.emitAsync).toHaveBeenCalledWith(EVENTS.USER_REGISTERED, payload);
    expect(mockEventEmitter.emitAsync).toHaveBeenCalledTimes(1);
  });
});
