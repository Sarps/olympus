import { Test, TestingModule } from '@nestjs/testing';
import { VerifyUserConsumer } from '@infrastructure/kafka/consumers/verify-user.consumer';
import { InitiateUserVerificationPort } from '@ports/in/users/initiate-user-verification.port';
import { UserEvent } from '@domain/models/events/user.event';

describe('VerifyUserConsumer', () => {
  let consumer: VerifyUserConsumer;
  let mockInitiateUserVerificationPort: Partial<InitiateUserVerificationPort>;

  beforeEach(async () => {
    mockInitiateUserVerificationPort = {
      initiateVerification: jest.fn().mockResolvedValue(undefined),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VerifyUserConsumer,
        {
          provide: InitiateUserVerificationPort,
          useValue: mockInitiateUserVerificationPort,
        },
      ],
    }).compile();

    consumer = module.get<VerifyUserConsumer>(VerifyUserConsumer);
  });

  it('should call initiateVerification with the correct parameters when handling USER_REGISTERED event', async () => {
    const payload: UserEvent = {
      id: '1',
      name: 'name',
      email: 'email',
      username: 'username',
      lastVerified: new Date(),
    };

    await consumer.handle(payload);

    expect(
      mockInitiateUserVerificationPort.initiateVerification,
    ).toHaveBeenCalledWith(payload.id, payload.email);
    expect(
      mockInitiateUserVerificationPort.initiateVerification,
    ).toHaveBeenCalledTimes(1);
  });
});
