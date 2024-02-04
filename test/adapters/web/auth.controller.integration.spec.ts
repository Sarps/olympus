import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '@infrastructure/web/controllers/auth.controller';
import { RegisterPort } from '@ports/in/auth/register.port';
import { JwtService } from '@nestjs/jwt';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: RegisterPort, useValue: null }, JwtService],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
