import { Test, TestingModule } from '@nestjs/testing';
import { CreateWalletConsumer } from '@infrastructure/kafka/consumers/create-wallet.consumer';
import { CreateUserWalletPort } from '@ports/in/wallets/create-user-wallet.port';
import { UserEvent } from '@domain/models/events/user.event';

describe('CreateWalletConsumer', () => {
  let consumer: CreateWalletConsumer;
  let mockCreateUserWalletPort: Partial<CreateUserWalletPort>;

  beforeEach(async () => {
    mockCreateUserWalletPort = { createUserWallet: jest.fn(), };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateWalletConsumer,
        { provide: CreateUserWalletPort, useValue: mockCreateUserWalletPort },
      ],
    }).compile();

    consumer = module.get<CreateWalletConsumer>(CreateWalletConsumer);
  });

  it('should call createUserWallet when handling USER_VERIFIED event', async () => {
    const payload: UserEvent = { id: '1', name: 'name', email: 'email', username: 'username', lastVerified: new Date() }

    await consumer.handle(payload);

    expect(mockCreateUserWalletPort.createUserWallet).toHaveBeenCalledWith(payload.id);
    expect(mockCreateUserWalletPort.createUserWallet).toHaveBeenCalledTimes(1);
  });

});
