import { Test, TestingModule } from '@nestjs/testing';
import { WalletStatementService } from './wallet-statement.service';
import { OperationRepository } from 'src/infrastructure/repositories/operation.repository';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { StatementResponseDto } from 'src/application/dtos/responses/statement.response';

describe('WalletStatementService', () => {
  let service: WalletStatementService;
  let operation: OperationRepository;

  const repositoryMock = {
    findUserOperations: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InfrastructureModule],
      providers: [
        WalletStatementService,
        {
          provide: OperationRepository,
          useValue: repositoryMock,
        },
      ],
    }).compile();

    service = module.get<WalletStatementService>(WalletStatementService);
    operation = module.get<OperationRepository>(OperationRepository);
  });

  describe('When the statement function is called', () => {
    it('should return an array of Operations objects', async () => {
      repositoryMock.findUserOperations.mockResolvedValueOnce(
        new StatementResponseDto()
      );

      const statementRequest = '456';

      const result = await service.getWalletStatement(statementRequest);
      expect(repositoryMock.findUserOperations).toBeCalled();
      expect(repositoryMock.findUserOperations).toBeTruthy();
      expect(result).toMatchObject(new StatementResponseDto());
    });
  });
});
