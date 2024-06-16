import { Injectable } from '@nestjs/common';
import { RESPONSE } from 'src/common/constants/response.constants';
import { OperationRepository } from 'src/infrastructure/repositories/operation.repository';

@Injectable()
export class WalletStatementService {
  constructor(private readonly operationRepository: OperationRepository) {}

  async getWalletStatement(id: string): Promise<any[]> {
    try {
      return await this.operationRepository.findUserOperations(id);
    } catch (error) {}
  }
}
