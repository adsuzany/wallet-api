import { Injectable, NotFoundException } from '@nestjs/common';
import { AddMoneyRequestDto } from 'src/application/dtos/requests/add-money.request.dto';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { IOperation } from '../../repositories-interfaces/operation.interface';
import { OperationTypeEnum } from 'src/common/enums/operation-type.enum';
import { RESPONSE } from 'src/common/constants/response.constants';
import { User } from '@prisma/client';

@Injectable()
export class ConsultBalanceService {
  constructor(private readonly userRepository: UserRepository) {}

  async getBalance(id: string): Promise<string> {
    try {
      const { balance } = await this.userRepository.findUserById(id);
      return RESPONSE.BALANCE(balance);
    } catch (error) {
      console.error(error);
      throw new NotFoundException(RESPONSE.NOT_FOUND);
    }
  }
}
