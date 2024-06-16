import { Injectable, NotFoundException } from '@nestjs/common';
import { RESPONSE } from 'src/common/constants/response.constants';
import { IOperation } from 'src/domain/repositories/operation.interface';
import { OperationRepository } from 'src/infrastructure/repositories/operation.repository';

@Injectable()
export class WalletStatementService {
  constructor(private readonly operationRepository: OperationRepository) {}

  async getWalletStatement(id: string): Promise<IOperation[]> {
    try {
      return await this.operationRepository.findUserOperations(id);
    } catch (error) {
      throw new NotFoundException(RESPONSE.NOT_FOUND);
    }
  }
}
