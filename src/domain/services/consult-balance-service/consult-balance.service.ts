import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/repositories/user.repository';
import { RESPONSE } from 'src/common/constants/response.constants';

@Injectable()
export class ConsultBalanceService {
  constructor(private readonly userRepository: UserRepository) {}

  async getBalance(id: string): Promise<string> {
    try {
      const { balance } = await this.userRepository.findUserById(id);
      return RESPONSE.BALANCE(balance);
    } catch (error) {
      console.error(error);
      throw new NotFoundException(RESPONSE.NOT_FOUND);
    }
  }
}
