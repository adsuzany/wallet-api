import { Test, TestingModule } from '@nestjs/testing';
import { WalletStatementService } from './wallet-statement.service';

describe('WalletStatementService', () => {
  let service: WalletStatementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WalletStatementService],
    }).compile();

    service = module.get<WalletStatementService>(WalletStatementService);
  });

  it('/ (GET)', () => {});
});
