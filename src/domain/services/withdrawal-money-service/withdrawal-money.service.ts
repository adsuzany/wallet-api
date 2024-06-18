import { Injectable, NotFoundException } from '@nestjs/common';
import { WithdrawalMoneyRequestDto } from 'src/application/dtos/requests/withdrawal-money.request.dto';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { IOperation } from '../../repositories/operation.interface';
import { OperationTypeEnum } from 'src/common/enums/operation-type.enum';
import { RESPONSE } from 'src/common/constants/response.constants';
import { IUser } from 'src/domain/repositories/user.interface';

@Injectable()
export class WithdrawalMoneyService {
  constructor(private readonly userRepository: UserRepository) {}

  async withdrawMoney(payload: WithdrawalMoneyRequestDto): Promise<string> {
    try {
      const user: IUser = await this.userRepository.findUserById(
        payload.userId
      );

      await this.withdrawOperation(user, payload);

      return RESPONSE.SUCCESS;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(RESPONSE.BALANCE_NEGATIVE);
    }
  }

  private async withdrawOperation(
    user: IUser,
    payload: WithdrawalMoneyRequestDto
  ): Promise<boolean> {
    try {
      if (user && user.balance >= payload.value) {
        const addOperation: IOperation = {
          currentBalance: user.balance - payload.value,
          type: OperationTypeEnum.withdrawal,
          value: payload.value,
        };

        await this.userRepository.createUserOperation(
          payload.userId,
          addOperation
        );
        return true;
      }

      throw new Error();
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}
