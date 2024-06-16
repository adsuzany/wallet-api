import { Operation, User } from '@prisma/client';
import { PrismaService } from '../services/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OperationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserOperations(userId: string): Promise<Operation[]> {
    return this.prisma.operation.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
