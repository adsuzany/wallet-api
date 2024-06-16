import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseService } from './purchase.service';

describe('AddMoneyService', () => {
  let service: PurchaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PurchaseService],
    }).compile();

    service = module.get<PurchaseService>(PurchaseService);
  });

  it('/ (GET)', () => {});
});
