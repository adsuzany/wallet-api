import { Test, TestingModule } from '@nestjs/testing';
import { AddMoneyService } from './add-money.service';

describe('AddMoneyService', () => {
  let service: AddMoneyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AddMoneyService],
    }).compile();

    service = module.get<AddMoneyService>(AddMoneyService);
  });

  it('/ (GET)', () => {});
});
