import { Test, TestingModule } from '@nestjs/testing';
import { ConsultBalanceService } from './consult-balance.service';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { NotFoundException } from '@nestjs/common';

describe('ConsultBalanceService', () => {
  let service: ConsultBalanceService;
  let userRepository: UserRepository;

  const repositoryMock = {
    findUserById: jest.fn(),
    createUserOperation: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InfrastructureModule],
      providers: [
        ConsultBalanceService,
        {
          provide: UserRepository,
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<ConsultBalanceService>(ConsultBalanceService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('When the user is not found', () => {
    it('should throw a Not Found error', async () => {
      const user = repositoryMock.findUserById.mockResolvedValueOnce(null);

      const balanceRequest = '456';

      expect(user.mock.results.values()[0]).toBeFalsy();
      try {
        await service.getBalance(balanceRequest);
      } catch (error) {
        expect(error).toEqual(new NotFoundException('User not found'));
      }
    });
  });

  describe('When the user exists', () => {
    it('should return the balance', async () => {
      const user = repositoryMock.findUserById.mockResolvedValueOnce({
        id: '456',
        balance: 20,
      });
      const balanceRequest = '456';

      const response = await service.getBalance(balanceRequest);

      expect(repositoryMock.findUserById).toBeCalled();
      expect(response).toBeTruthy();
    });
  });
});
