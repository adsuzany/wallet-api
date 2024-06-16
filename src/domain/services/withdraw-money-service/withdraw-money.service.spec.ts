import { Test, TestingModule } from '@nestjs/testing';
import { WithdrawMoneyService } from './withdraw-money.service';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { PrismaService } from 'src/infrastructure/services/prisma.service';

describe('WithdrawMoneyService', () => {
  let service: WithdrawMoneyService;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InfrastructureModule],
      providers: [
        WithdrawMoneyService,
        {
          provide: UserRepository,
          useValue: { createUserOperation: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<WithdrawMoneyService>(WithdrawMoneyService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('When a user doesnt exists', () => {
    it('should create a new user', async () => {
      const withdrawRequest = { userId: '123', value: 20 };

      await service.withdrawMoney(withdrawRequest);

      expect(service).toBeCalled;
    });
    it('should have a negative balance', () => {});
  });
});
