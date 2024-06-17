import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseService } from './purchase.service';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';

describe('PurchaseService', () => {
  let service: PurchaseService;
  let userRepository: UserRepository;

  const repositoryMock = {
    findUserById: jest.fn(),
    createUserOperation: jest.fn(),
    findUserByIdOrThrow: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InfrastructureModule],
      providers: [
        PurchaseService,
        {
          provide: UserRepository,
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<PurchaseService>(PurchaseService);
    userRepository = module.get<UserRepository>(UserRepository);
  });

  describe('When a user doesnt exists', () => {
    it('should create a new user', async () => {
      const user = repositoryMock.findUserById.mockResolvedValueOnce(null);
      repositoryMock.createUserOperation.mockResolvedValueOnce({
        id: '476',
        balance: 60,
      });
      const addMoneyRequest = { userId: '476', value: 60 };

      await service.recordPurchase(addMoneyRequest);

      expect(user.mock.results.values()[0]).toBeFalsy();
      expect(repositoryMock.createUserOperation).toBeCalled;
    });
  });

  describe('When a user exists', () => {
    it('should record the purchase into the wallet', async () => {
      repositoryMock.findUserById.mockResolvedValueOnce({
        id: '124',
        balance: 70,
      });
      repositoryMock.createUserOperation.mockResolvedValueOnce({
        id: '124',
        balance: 90,
      });
      const addMoneyRequest = { userId: '124', value: 20 };

      const response = await service.recordPurchase(addMoneyRequest);

      expect(repositoryMock.findUserById).toBeCalled();
      expect(repositoryMock.createUserOperation).toBeCalled;
      expect(response).toBeTruthy();
    });
  });
});
