import { Injectable } from '@nestjs/common';
import { WithdrawMoneyRequestDto } from 'src/application/dtos/requests/withdraw-money.request.dto';

@Injectable()
export class WithdrawMoneyService {
  constructor() {}

  async withdrawMoney(payload: WithdrawMoneyRequestDto): Promise<string> {
    return 'running';
  }
}
