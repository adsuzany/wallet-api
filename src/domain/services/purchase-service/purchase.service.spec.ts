import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseService } from './purchase.service';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { NotFoundException } from '@nestjs/common';
import { RESPONSE } from 'src/common/constants/response.constants';
import { StatementResponseDto } from 'src/application/dtos/responses/statement.response';

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
    it('should throw a Not Found error', async () => {
      const user = repositoryMock.findUserById.mockResolvedValueOnce(null);

      const addMoneyRequest = { userId: '476', value: 60 };

      expect(user.mock.results.values()[0]).toBeFalsy();
      expect(user.mock.results.values()[0]).toBeFalsy();
      try {
        await service.recordPurchase(addMoneyRequest);
      } catch (error) {
        expect(error).toEqual(new NotFoundException(RESPONSE.NOT_FOUND));
      }
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
        operations: [new StatementResponseDto()],
      });
      const purchaseRequest = { userId: '124', value: 20 };

      const response = await service.recordPurchase(purchaseRequest);

      expect(repositoryMock.findUserById).toBeCalled();
      expect(repositoryMock.createUserOperation).toBeCalled;
      expect(response).toBeTruthy();
    });

    it('should return the object of Operation created', async () => {
      repositoryMock.findUserById.mockResolvedValueOnce({
        id: '124',
        balance: 70,
      });
      repositoryMock.createUserOperation.mockResolvedValueOnce({
        id: '124',
        balance: 90,
        operations: [new StatementResponseDto()],
      });

      const purchaseRequest = { userId: '124', value: 20 };

      const result = await service.recordPurchase(purchaseRequest);
      expect(repositoryMock.findUserById).toBeCalled();
      expect(repositoryMock.createUserOperation).toBeTruthy();
      expect(result).toMatchObject(new StatementResponseDto());
    });
  });
});
