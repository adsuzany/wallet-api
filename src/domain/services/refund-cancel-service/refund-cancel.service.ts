import { OperationRepository } from 'src/infrastructure/repositories/operation.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { IOperation } from '../../repositories/operation.interface';
import { OperationTypeEnum } from 'src/common/enums/operation-type.enum';
import { RESPONSE } from 'src/common/constants/response.constants';
import { IUser } from 'src/domain/repositories/user.interface';
import { RefundCancelPurchaseRequestDto } from 'src/application/dtos/requests/refund-cancel-purchase.request.dto';

@Injectable()
export class RefundCancelService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly operationRepository: OperationRepository
  ) {}

  async refundCancelPurchase(
    payload: RefundCancelPurchaseRequestDto
  ): Promise<string> {
    try {
      const user: IUser = await this.userRepository.findUserById(
        payload.userId
      );

      const operation: IOperation =
        await this.operationRepository.findPurchaseByUser(payload);

      await this.addOperation(user, operation, payload);

      return RESPONSE.SUCCESS;
    } catch (error) {
      console.error(error);
      throw new NotFoundException(RESPONSE.NOT_FOUND_OPERATION);
    }
  }

  private async addOperation(
    user: IUser,
    operation: IOperation,
    payload: RefundCancelPurchaseRequestDto
  ): Promise<boolean> {
    try {
      if (!operation.status) {
        const addOperation: IOperation = {
          currentBalance: user
            ? user.balance + operation.value
            : operation.value,
          type: OperationTypeEnum.refund,
          value: operation.value,
          status: true,
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
      throw new Error();
    }
  }
}
