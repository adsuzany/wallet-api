import { Test, TestingModule } from '@nestjs/testing';
import { RefundCancelService } from './refund-cancel.service';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';

describe('RefundCancelService', () => {
  let service: RefundCancelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [InfrastructureModule],
      providers: [RefundCancelService],
    }).compile();

    service = module.get<RefundCancelService>(RefundCancelService);
  });

  it('/ (GET)', () => {});
});
