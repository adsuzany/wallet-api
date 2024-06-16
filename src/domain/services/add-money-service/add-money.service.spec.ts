import { Test, TestingModule } from '@nestjs/testing';
import { AddMoneyService } from './add-money.service';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';

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
    it('should create a new user', async () => {
      const user = repositoryMock.findUserById.mockResolvedValueOnce(null);
      repositoryMock.createUserOperation.mockResolvedValueOnce({
        id: '345',
        balance: 20,
      });
      const addMoneyRequest = { userId: '123', value: 20 };

      await service.addMoney(addMoneyRequest);

      expect(user.mock.results.values()[0]).toBeFalsy();
      expect(repositoryMock.createUserOperation).toBeCalled;
    });

    it('should create a new user', async () => {
      const user = repositoryMock.findUserById.mockResolvedValueOnce(null);
      repositoryMock.createUserOperation.mockResolvedValueOnce({
        id: '345',
        balance: 20,
      });
      const addMoneyRequest = { userId: '123', value: 20 };

      const response = await service.addMoney(addMoneyRequest);

      expect(user.mock.results.values()[0]).toBeFalsy();
      expect(response).toBeTruthy();
      expect(repositoryMock.createUserOperation).toBeCalled;
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
        balance: 20,
      });
      const addMoneyRequest = { userId: '123', value: 20 };

      const response = await service.addMoney(addMoneyRequest);

      expect(repositoryMock.findUserById).toBeCalled();
      expect(response).toBeTruthy();
      expect(repositoryMock.createUserOperation).toBeCalled;
    });
  });
});
