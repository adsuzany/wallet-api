import { User } from '@prisma/client';
import { PrismaService } from '../services/prisma.service';
import { IOperation } from 'src/domain/repositories-interfaces/operation.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUserOperation(id: string, record: IOperation): Promise<User> {
    const operation = {
      create: record,
    };

    return this.prisma.user.upsert({
      where: { id },
      create: {
        id,
        balance: record.currentBalance,
        operations: operation,
      },
      update: {
        balance: record.currentBalance,
        operations: operation,
      },
    });
  }

  async findUserById(id: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
}
