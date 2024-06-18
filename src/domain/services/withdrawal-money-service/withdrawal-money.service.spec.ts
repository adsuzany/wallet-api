import { Test, TestingModule } from '@nestjs/testing';
import { WithdrawalMoneyService } from './withdrawal-money.service';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { NotFoundException } from '@nestjs/common';
import { RESPONSE } from 'src/common/constants/response.constants';

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
    it('should throw a Not Found error', async () => {
      const user = repositoryMock.findUserById.mockResolvedValueOnce(null);

      const withdrawRequest = { userId: '478', value: 20 };

      try {
        await service.withdrawMoney(withdrawRequest);
      } catch (error) {
        expect(error).toEqual(new NotFoundException(RESPONSE.BALANCE_NEGATIVE));
      }
      expect(user.mock.results.values()[0]).toBeFalsy();
      expect(repositoryMock.createUserOperation).toBeCalled;
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
        balance: 0,
      });
      const withdrawRequest = { userId: '345', value: 20 };

      const response = await service.withdrawMoney(withdrawRequest);

      expect(repositoryMock.findUserById).toBeCalled();
      expect(repositoryMock.createUserOperation).toBeCalled;
      expect(response).toBeTruthy();
    });

    it('should throw an exeption when the balance is 0', async () => {
      repositoryMock.findUserById.mockResolvedValueOnce({
        id: '345',
        balance: 0,
      });

      const withdrawRequest = { userId: '345', value: 20 };

      try {
        await service.withdrawMoney(withdrawRequest);
      } catch (error) {
        expect(error).toEqual(new NotFoundException(RESPONSE.BALANCE_NEGATIVE));
      }
      expect(repositoryMock.findUserById).toBeCalled();
    });
  });
});
