import { Test, TestingModule } from '@nestjs/testing';
import { AddMoneyService } from './add-money.service';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

describe('AddMoneyService', () => {
  let service: AddMoneyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InfrastructureModule],
      providers: [AddMoneyService],
    }).compile();

    service = module.get<AddMoneyService>(AddMoneyService);
  });

  it('/ (GET)', () => {});
});
