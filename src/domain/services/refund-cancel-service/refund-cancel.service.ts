import { Injectable } from '@nestjs/common';
import { AddMoneyRequestDto } from 'src/application/dtos/requests/add-money.request.dto';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { IOperation } from '../../repositories-interfaces/operation.interface';
import { OperationTypeEnum } from 'src/common/enums/operation-type.enum';
import { RESPONSE } from 'src/common/constants/response.constants';
import { User } from '@prisma/client';

@Injectable()
export class RefundCancelService {
  constructor(private readonly userRepository: UserRepository) {}

  async refundCancelPurchase(payload: AddMoneyRequestDto): Promise<string> {
    try {
      // procurar a operacao do usuario e fazer o upsert com aquele valor anterior
      const user: User = await this.userRepository.findUserById(payload.userId);
      const addOperation: IOperation = {
        currentBalance: user ? user.balance + payload.value : payload.value,
        type: OperationTypeEnum.refund,
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
