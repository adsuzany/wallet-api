import { RefundCancelPurchaseRequestDto } from 'src/application/dtos/requests/refund-cancel-purchase.request.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { RefundCancelService } from './refund-cancel.service';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { NotFoundException } from '@nestjs/common';
import { OperationRepository } from 'src/infrastructure/repositories/operation.repository';
import { OperationTypeEnum } from 'src/common/enums/operation-type.enum';

describe('RefundCancelService', () => {
  let service: RefundCancelService;
  let userRepository: UserRepository;
  let operationRepository: OperationRepository;

  const userRepositoryMock = {
    findUserById: jest.fn(),
    createUserOperation: jest.fn(),
    findUserByIdOrThrow: jest.fn(),
  };

  const operationRepositoryMock = {
    findUserOperations: jest.fn(),
    findPurchaseByUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InfrastructureModule],
      providers: [
        RefundCancelService,
        {
          provide: UserRepository,
          useValue: userRepository,
        },
        {
          provide: OperationRepository,
          useValue: operationRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<RefundCancelService>(RefundCancelService);
    userRepository = module.get<UserRepository>(UserRepository);
    operationRepository = module.get<OperationRepository>(OperationRepository);
  });

  describe('When a user doesnt exists', () => {
    it('should throw a Not Found error', async () => {
      const user = userRepositoryMock.findUserById.mockResolvedValueOnce(null);

      const refundCancelRequest: RefundCancelPurchaseRequestDto = {
        userId: '456',
        purchaseId: '354',
      };

      expect(user.mock.results.values()[0]).toBeFalsy();
      try {
        await service.refundCancelPurchase(refundCancelRequest);
      } catch (error) {
        expect(error).toEqual(new NotFoundException('Purchase not found'));
      }
    });
  });

  describe('When a purchase doesnt exists', () => {
    it('should throw an Error', async () => {
      const user = userRepositoryMock.findUserById.mockResolvedValueOnce(null);

      const refundCancelRequest: RefundCancelPurchaseRequestDto = {
        userId: '456',
        purchaseId: '354',
      };

      expect(user.mock.results.values()[0]).toBeFalsy();
      try {
        await service.refundCancelPurchase(refundCancelRequest);
      } catch (error) {
        expect(error).toEqual(new NotFoundException('Purchase not found'));
      }
    });
  });

  describe('When a user exists', () => {
    it('should record the cancel and refund operation to add back the money from the wallet', async () => {
      operationRepositoryMock.findPurchaseByUser.mockResolvedValueOnce({
        id: '466',
        type: OperationTypeEnum.refund,
        userId: '468',
        value: 20,
        currentBalance: 30,
      });

      userRepositoryMock.createUserOperation.mockResolvedValueOnce({
        id: '468',
        balance: 10,
      });

      const refundCancelRequest: RefundCancelPurchaseRequestDto = {
        userId: '468',
        purchaseId: '466',
      };

      const response = await service.refundCancelPurchase(refundCancelRequest);

      expect(operationRepositoryMock.findPurchaseByUser).toBeCalled();
      expect(userRepositoryMock.createUserOperation).toBeCalled;
      expect(response).toBeTruthy();
    });
  });
});
