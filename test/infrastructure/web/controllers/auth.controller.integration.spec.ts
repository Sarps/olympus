import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '@infrastructure/web/controllers/auth.controller';
import { RegisterPort } from '@ports/in/auth/register.port';
import { JwtService } from '@nestjs/jwt';
import { ExecutionContext } from '@nestjs/common';
import { LoginGuard } from '@infrastructure/passport/guards/local.guard';
import { UserEntity } from '@domain/models/entities/user.entity';
import { AuthRegisterDto } from '@infrastructure/web/dto/auth-register.dto';

describe('AuthController', () => {
  let controller: AuthController;
  let mockRegisterPort: Partial<RegisterPort>;
  let mockJwtService: Partial<JwtService>;

  beforeEach(async () => {
    mockRegisterPort = {
      register: jest
        .fn()
        .mockImplementation((dto) =>
          Promise.resolve({ ...dto, id: 'some-id' }),
        ),
    };

    mockJwtService = {
      sign: jest
        .fn()
        .mockImplementation((payload) => `signed-token-for-${payload.sub}`),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: RegisterPort, useValue: mockRegisterPort },
        { provide: JwtService, useValue: mockJwtService },
      ],
    })
      .overrideGuard(LoginGuard)
      .useValue({ canActivate: (context: ExecutionContext) => true })
      .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should return a valid access token', async () => {
      const user = new UserEntity(
        'user-1',
        'Test User',
        'testuser',
        'testuser@email.com',
        'testpass',
      );
      const result = await controller.login(user);

      expect(result).toHaveProperty('access_token');
      expect(result.access_token).toEqual(`signed-token-for-user-1`);
      expect(mockJwtService.sign).toHaveBeenCalledWith({
        username: user.username,
        sub: user.id,
      });
    });
  });

  describe('register', () => {
    it('should successfully register a user', async () => {
      const dto: AuthRegisterDto = {
        name: 'New User',
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password',
        passwordConfirmation: 'password',
      };

      await controller.register(dto);

      expect(mockRegisterPort.register).toHaveBeenCalledWith({
        name: dto.name,
        username: dto.username,
        email: dto.email,
        password: dto.password,
      });
    });
  });
});
