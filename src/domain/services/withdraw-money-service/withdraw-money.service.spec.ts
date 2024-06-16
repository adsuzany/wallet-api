import { Test, TestingModule } from '@nestjs/testing';
import { WithdrawMoneyService } from './withdraw-money.service';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

describe('WithdrawMoneyService', () => {
  let service: WithdrawMoneyService;
  let userRepository: UserRepository;

  const repositoryMock = {
    findUserById: jest.fn(),
    createUserOperation: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InfrastructureModule],
      providers: [
        WithdrawMoneyService,
        {
          provide: UserRepository,
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<WithdrawMoneyService>(WithdrawMoneyService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('When a user doesnt exists', () => {
    it('should create a new user', async () => {
      const user = repositoryMock.findUserById.mockResolvedValueOnce(null);
      repositoryMock.createUserOperation.mockResolvedValueOnce({
        id: '345',
        balance: 20,
      });
      const withdrawRequest = { userId: '123', value: 20 };

      const a = repositoryMock.createUserOperation.mock.results.values()[0];

      await service.withdrawMoney(withdrawRequest);

      expect(user.mock.results.values()[0]).toBeFalsy();
      expect(repositoryMock.createUserOperation).toBeCalled;
    });

    it('should create a new user', async () => {
      const user = repositoryMock.findUserById.mockResolvedValueOnce(null);
      repositoryMock.createUserOperation.mockResolvedValueOnce({
        id: '345',
        balance: 20,
      });
      const withdrawRequest = { userId: '123', value: 20 };

      const a = repositoryMock.createUserOperation.mock.results.values()[0];

      await service.withdrawMoney(withdrawRequest);

      expect(user.mock.results.values()[0]).toBeFalsy();
      expect(repositoryMock.createUserOperation).toBeCalled;
    });
  });
});
