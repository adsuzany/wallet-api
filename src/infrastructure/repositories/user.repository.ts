import { PrismaService } from '../services/prisma.service';
import { IOperation } from 'src/domain/repositories/operation.interface';
import { Injectable } from '@nestjs/common';
import { IUser } from 'src/domain/repositories/user.interface';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createUserOperation(id: string, record: IOperation): Promise<IUser> {
    return this.prisma.user.update({
      where: { id },
      data: {
        balance: record.currentBalance,
        operations: {
          create: record,
        },
      },
      include: {
        operations: { orderBy: { createdAt: 'desc' } },
      },
    });
  }

  async findUserById(id: string): Promise<IUser> {
    return this.prisma.user.findUniqueOrThrow({
      where: { id },
    });
  }
}
