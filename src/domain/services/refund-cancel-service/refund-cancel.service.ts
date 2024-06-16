import { OperationRepository } from 'src/infrastructure/repositories/operation.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { IOperation } from '../../repositories/operation.interface';
import { OperationTypeEnum } from 'src/common/enums/operation-type.enum';
import { RESPONSE } from 'src/common/constants/response.constants';
import { IUser } from 'src/domain/repositories/user.interface';
import { RefundCancelPurchaseDto } from 'src/application/dtos/requests/refund-cancel-purchase.request.dto';

@Injectable()
export class RefundCancelService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly operationRepository: OperationRepository
  ) {}

  async refundCancelPurchase(
    payload: RefundCancelPurchaseDto
  ): Promise<string> {
    try {
      const operation: IOperation =
        await this.operationRepository.findPurchaseByUser(payload);
      const user: IUser = await this.userRepository.findUserById(
        payload.userId
      );

      await this.addOperation(user, operation);

      return RESPONSE.SUCCESS;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(RESPONSE.NOT_FOUND);
    }
  }

  private async addOperation(
    user: IUser,
    operation: IOperation
  ): Promise<void> {
    try {
      const addOperation: IOperation = {
        currentBalance: user ? user.balance + operation.value : operation.value,
        type: OperationTypeEnum.refund,
        value: operation.value,
      };

      await this.userRepository.createUserOperation(
        operation.userId,
        addOperation
      );
    } catch (error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}
