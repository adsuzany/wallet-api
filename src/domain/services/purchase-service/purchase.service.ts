import { Injectable, NotFoundException } from '@nestjs/common';
import { AddMoneyRequestDto } from 'src/application/dtos/requests/add-money.request.dto';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { IOperation } from '../../repositories/operation.interface';
import { OperationTypeEnum } from 'src/common/enums/operation-type.enum';
import { RESPONSE } from 'src/common/constants/response.constants';
import { IUser } from 'src/domain/repositories/user.interface';
import { StatementResponseDto } from 'src/application/dtos/responses/statement.response.dto';

@Injectable()
export class PurchaseService {
  constructor(private readonly userRepository: UserRepository) {}

  async recordPurchase(
    payload: AddMoneyRequestDto
  ): Promise<StatementResponseDto> {
    try {
      const user: IUser = await this.userRepository.findUserById(
        payload.userId
      );

      const { operations } = await this.withdrawOperation(user, payload);

      return operations[0] as StatementResponseDto;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(RESPONSE.NOT_FOUND);
    }
  }

  private async withdrawOperation(
    user: IUser,
    payload: AddMoneyRequestDto
  ): Promise<IUser> {
    try {
      const addOperation: IOperation = {
        currentBalance: user ? user.balance - payload.value : -payload.value,
        type: OperationTypeEnum.purchase,
        value: payload.value,
      };

      const operation: IUser = await this.userRepository.createUserOperation(
        payload.userId,
        addOperation
      );
      return operation;
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}
