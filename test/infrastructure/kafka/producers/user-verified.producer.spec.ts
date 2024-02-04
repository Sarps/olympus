import { Test, TestingModule } from '@nestjs/testing';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { UserVerifiedProducer } from '@infrastructure/kafka/producers/user-verified.producer';
import { EVENTS } from '@infrastructure/constants';
import { UserEvent } from '@domain/models/events/user.event';

describe('UserVerifiedProducer', () => {
  let service: UserVerifiedProducer;
  let mockEventEmitter: Partial<EventEmitter2>;

  beforeEach(async () => {
    mockEventEmitter = {
      emitAsync: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserVerifiedProducer,
        { provide: EventEmitter2, useValue: mockEventEmitter },
      ],
    }).compile();

    service = module.get<UserVerifiedProducer>(UserVerifiedProducer);
  });

  it('should emit the USER_VERIFIED event with the correct payload', async () => {
    const payload: UserEvent = { id: '1', name: 'name', email: 'email', username: 'username' };

    await service.fire(payload);

    expect(mockEventEmitter.emitAsync).toHaveBeenCalledWith(EVENTS.USER_VERIFIED, payload);
    expect(mockEventEmitter.emitAsync).toHaveBeenCalledTimes(1);
  });
});
