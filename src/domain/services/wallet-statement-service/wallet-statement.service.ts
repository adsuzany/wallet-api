import { Injectable, NotFoundException } from '@nestjs/common';
import { StatementResponseDto } from 'src/application/dtos/responses/statement.response';
import { RESPONSE } from 'src/common/constants/response.constants';
import { OperationRepository } from 'src/infrastructure/repositories/operation.repository';

@Injectable()
export class WalletStatementService {
  constructor(private readonly operationRepository: OperationRepository) {}

  async getWalletStatement(id: string): Promise<StatementResponseDto[]> {
    try {
      return await this.operationRepository.findUserOperations(id);
    } catch (error) {
      throw new NotFoundException(RESPONSE.NOT_FOUND);
    }
  }
}
