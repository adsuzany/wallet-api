import { Test, TestingModule } from '@nestjs/testing';
import { ConsultBalanceService } from './consult-balance.service';

describe('ConsultBalanceService', () => {
  let service: ConsultBalanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsultBalanceService],
    }).compile();

    service = module.get<ConsultBalanceService>(ConsultBalanceService);
  });

  it('/ (GET)', () => {});
});
