import { Injectable, NotFoundException } from '@nestjs/common';
import { StatementResponseDto } from 'src/application/dtos/responses/statement.response.dto';
import { RESPONSE } from 'src/common/constants/response.constants';
import { OperationRepository } from 'src/infrastructure/repositories/operation.repository';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';

@Injectable()
export class WalletStatementService {
  constructor(
    private readonly operationRepository: OperationRepository,
    private readonly userRepository: UserRepository
  ) {}

  async getWalletStatement(id: string): Promise<StatementResponseDto[]> {
    try {
      await this.userRepository.findUserById(id);
      return await this.operationRepository.findUserOperations(id);
    } catch (error) {
      console.error(error);
      throw new NotFoundException(RESPONSE.NOT_FOUND);
    }
  }
}
