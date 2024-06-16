import { Injectable } from '@nestjs/common';
import { WithdrawMoneyRequestDto } from 'src/application/dtos/requests/withdraw-money.request.dto';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { IOperation } from '../../repositories/operation.interface';
import { OperationTypeEnum } from 'src/common/enums/operation-type.enum';
import { RESPONSE } from 'src/common/constants/response.constants';
import { IUser } from 'src/domain/repositories/user.interface';

@Injectable()
export class WithdrawMoneyService {
  constructor(private readonly userRepository: UserRepository) {}

  async withdrawMoney(payload: WithdrawMoneyRequestDto): Promise<string> {
    try {
      const user: IUser = await this.userRepository.findUserById(
        payload.userId
      );
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
