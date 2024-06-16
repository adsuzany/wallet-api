import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { WithdrawMoneyRequestDto } from 'src/application/dtos/requests/withdraw-money.request.dto';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { IOperation } from '../../repositories-interfaces/operation.interface';
import { OperationTypeEnum } from 'src/common/enums/operation-type.enum';
import { RESPONSE } from 'src/common/constants/response.constants';

@Injectable()
export class WithdrawMoneyService {
  constructor(private readonly userRepository: UserRepository) {}

  async withdrawMoney(payload: WithdrawMoneyRequestDto): Promise<string> {
    try {
      const user: User = await this.userRepository.findUserById(payload.userId);
      const addOperation: IOperation = {
        currentBalance: user ? user.balance - payload.value : -payload.value,
        type: OperationTypeEnum.withdraw,
        value: payload.value,
      };

      await this.userRepository.createUserOperation(
        payload.userId,
        addOperation
      );

      return RESPONSE.SUCCESS;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}
