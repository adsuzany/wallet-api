import { Injectable } from '@nestjs/common';
import { AddMoneyRequestDto } from 'src/application/dtos/requests/add-money.request.dto';

@Injectable()
export class AddMoneyService {
  constructor() {}

  async addMoney(payload: AddMoneyRequestDto): Promise<string> {
    return 'running';
  }
}
