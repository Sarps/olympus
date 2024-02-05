import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UsersController } from '@infrastructure/web/controllers/users.controller';
import { UserProfilePort } from '@ports/in/users/user-profile.port';
import { VerifyUserPort } from '@ports/in/users/verify-user.port';
import { UserWalletBalancePort } from '@ports/in/wallets/user-wallet-balance.port';
import { JwtGuard } from '@infrastructure/passport/guards/jwt.guard';
import { UserVerifiedGuard } from '@infrastructure/web/user-verified.guard';
import { UserEntity } from '@domain/models/entities/user.entity';
import { AmountEntity } from '@domain/models/entities/amount.entity';
import { Currency } from '@domain/models/enums/currency';
import { It, Mock } from 'moq.ts';

describe('UsersController', () => {
  let app: INestApplication;
  let usersController: UsersController;

  // Mock ports
  const mockUserProfilePort = { getUserProfile: jest.fn() };
  const mockVerifyUserPort = {
    verifyByToken: jest.fn(),
    verifyByOtp: jest.fn(),
  };
  const mockUserWalletBalancePort = { viewUserWalletBalance: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: UserProfilePort, useValue: mockUserProfilePort },
        { provide: VerifyUserPort, useValue: mockVerifyUserPort },
        { provide: UserWalletBalancePort, useValue: mockUserWalletBalancePort },
      ],
    })
      .overrideGuard(JwtGuard)
      .useValue({ canActivate: () => true })
      .overrideGuard(UserVerifiedGuard)
      .useValue({ canActivate: () => true })
      .compile();

    app = module.createNestApplication();
    await app.init();

    usersController = module.get<UsersController>(UsersController);
  });

  afterEach(async () => {
    await app.close();
  });

  describe('getUserProfile', () => {
    it('should return the user profile', async () => {
      const user = new UserEntity(
        '1',
        'Test User',
        'testuser',
        'test@example.com',
        'password',
        new Date(),
      );
      mockUserProfilePort.getUserProfile.mockResolvedValue(user);

      const response = await usersController.getUserProfile(user);
      expect(response).toEqual(
        expect.objectContaining({
          name: user.name,
          username: user.username,
          email: user.email,
        }),
      );
      expect(mockUserProfilePort.getUserProfile).toHaveBeenCalledWith(user);
    });
  });

  describe('verifyViaOtp', () => {
    it('should verify the user via otp', async () => {
      const pin = 'code';
      const userMock = new Mock<UserEntity>().object();
      mockVerifyUserPort.verifyByOtp.mockResolvedValue(undefined);

      await expect(
        usersController.verifyViaOtp({ pin }, userMock),
      ).resolves.toBeUndefined();
      expect(mockVerifyUserPort.verifyByOtp).toHaveBeenCalledWith(
        pin,
        userMock,
      );
    });
  });

  describe('verifyViaToken', () => {
    it('should verify the user via link token', async () => {
      const tokenOrCode = 'token';
      mockVerifyUserPort.verifyByToken.mockResolvedValue(undefined);

      await expect(
        usersController.verifyViaToken(tokenOrCode),
      ).resolves.toContain('verified');
      expect(mockVerifyUserPort.verifyByToken).toHaveBeenCalledWith(
        tokenOrCode,
      );
    });
  });

  describe('viewUserWalletBalance', () => {
    it('should return the user wallet balance', async () => {
      const user = new Mock<UserEntity>()
        .setup((i) => i.id)
        .returns('1')
        .object();
      const balance = new AmountEntity(Currency.USD, 100);
      mockUserWalletBalancePort.viewUserWalletBalance.mockResolvedValue(
        balance,
      );

      const response = await usersController.viewUserWalletBalance(user);

      expect(response).toEqual(balance);
      expect(
        mockUserWalletBalancePort.viewUserWalletBalance,
      ).toHaveBeenCalledWith(user.id);
    });
  });
});
