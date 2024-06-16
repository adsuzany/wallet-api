import { Test, TestingModule } from '@nestjs/testing';
import { RefundCancelService } from './refund-cancel.service';

describe('RefundCancelService', () => {
  let service: RefundCancelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RefundCancelService],
    }).compile();

    service = module.get<RefundCancelService>(RefundCancelService);
  });

  it('/ (GET)', () => {});
});
