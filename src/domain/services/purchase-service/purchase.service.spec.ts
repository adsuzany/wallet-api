import { Test, TestingModule } from '@nestjs/testing';
import { PurchaseService } from './purchase.service';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

describe('AddMoneyService', () => {
  let service: PurchaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InfrastructureModule],
      providers: [PurchaseService],
    }).compile();

    service = module.get<PurchaseService>(PurchaseService);
  });

  it('/ (GET)', () => {});
});
