import { Test, TestingModule } from '@nestjs/testing';
import { WalletStatementService } from './wallet-statement.service';
import { OperationRepository } from 'src/infrastructure/repositories/operation.repository';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { StatementResponseDto } from 'src/application/dtos/responses/statement.response.dto';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';

describe('WalletStatementService', () => {
  let service: WalletStatementService;
  let operation: OperationRepository;

  const operationsRepositoryMock = {
    findUserOperations: jest.fn(),
  };

  const userRepositoryMock = {
    findUserById: jest.fn(),
    createUserOperation: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InfrastructureModule],
      providers: [
        WalletStatementService,
        {
          provide: OperationRepository,
          useValue: operationsRepositoryMock,
        },
        {
          provide: UserRepository,
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<WalletStatementService>(WalletStatementService);
    operation = module.get<OperationRepository>(OperationRepository);
  });

  describe('When the statement function is called', () => {
    it('should return an array of Operations objects', async () => {
      userRepositoryMock.findUserById.mockResolvedValueOnce({
        id: '345',
        balance: 20,
      });

      operationsRepositoryMock.findUserOperations.mockResolvedValueOnce(
        new StatementResponseDto()
      );

      const statementRequest = '456';

      const result = await service.getWalletStatement(statementRequest);
      expect(operationsRepositoryMock.findUserOperations).toBeCalled();
      expect(operationsRepositoryMock.findUserOperations).toBeTruthy();
      expect(result).toMatchObject(new StatementResponseDto());
    });
  });
});
