import { Test, TestingModule } from '@nestjs/testing';
import { AddMoneyService } from './add-money.service';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { NotFoundException } from '@nestjs/common';

describe('AddMoneyService', () => {
  let service: AddMoneyService;
  let userRepository: UserRepository;

  const repositoryMock = {
    findUserById: jest.fn(),
    createUserOperation: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InfrastructureModule],
      providers: [
        AddMoneyService,
        {
          provide: UserRepository,
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<AddMoneyService>(AddMoneyService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('When a user doesnt exists', () => {
    it('should throw a Not Found error', async () => {
      const user = repositoryMock.findUserById.mockResolvedValueOnce(null);
      const addMoneyRequest = { userId: '098', value: 20 };

      try {
        await service.addMoney(addMoneyRequest);
      } catch (error) {
        expect(error).toEqual(new NotFoundException('User not found'));
      }
      expect(user.mock.results.values()[0]).toBeFalsy();
    });
  });

  describe('When a user exists', () => {
    it('should add the money into the wallet', async () => {
      repositoryMock.findUserById.mockResolvedValueOnce({
        id: '345',
        balance: 20,
      });
      repositoryMock.createUserOperation.mockResolvedValueOnce({
        id: '345',
        balance: 40,
      });
      const addMoneyRequest = { userId: '345', value: 20 };

      const response = await service.addMoney(addMoneyRequest);

      expect(repositoryMock.findUserById).toBeCalled();
      expect(repositoryMock.createUserOperation).toBeCalled;
      expect(response).toBeTruthy();
    });
  });
});
