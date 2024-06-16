import { Test, TestingModule } from '@nestjs/testing';
import { WithdrawalMoneyService } from './withdrawal-money.service';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

describe('WithdrawalMoneyService', () => {
  let service: WithdrawalMoneyService;
  let userRepository: UserRepository;

  const repositoryMock = {
    findUserById: jest.fn(),
    createUserOperation: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InfrastructureModule],
      providers: [
        WithdrawalMoneyService,
        {
          provide: UserRepository,
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<WithdrawalMoneyService>(WithdrawalMoneyService);
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

      await service.withdrawMoney(withdrawRequest);

      expect(user.mock.results.values()[0]).toBeFalsy();
      expect(repositoryMock.createUserOperation).toBeCalled;
    });

    it('should still register the operation and record a negative balance', async () => {
      const user = repositoryMock.findUserById.mockResolvedValueOnce(null);
      repositoryMock.createUserOperation.mockResolvedValueOnce({
        id: '345',
        balance: 20,
      });
      const withdrawRequest = { userId: '123', value: 20 };

      const response = await service.withdrawMoney(withdrawRequest);

      expect(user.mock.results.values()[0]).toBeFalsy();
      expect(repositoryMock.createUserOperation).toBeCalled;
      expect(response).toBeTruthy();
    });
  });

  describe('When a user exists', () => {
    it('should record the withdrawal operation of the money from the wallet', async () => {
      repositoryMock.findUserById.mockResolvedValueOnce({
        id: '345',
        balance: 20,
      });
      repositoryMock.createUserOperation.mockResolvedValueOnce({
        id: '345',
        balance: 20,
      });
      const withdrawRequest = { userId: '123', value: 20 };

      const response = await service.withdrawMoney(withdrawRequest);

      expect(repositoryMock.findUserById).toBeCalled();
      expect(repositoryMock.createUserOperation).toBeCalled;
      expect(response).toBeTruthy();
    });
  });
});
