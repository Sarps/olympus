import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '@infrastructure/prisma/prisma.service';

describe('PrismaService', () => {
  let service: PrismaService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  afterEach(async () => await module.close());

  it('should create an instance', () => {
    expect(service).toBeDefined();
  });

  it('should connect on module init', async () => {
    const $connect = jest.spyOn(service, '$connect').mockResolvedValue();

    await module.init();
    expect($connect).toHaveBeenCalled();
  });
});
