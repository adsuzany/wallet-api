import { Operation, OperationType } from '@prisma/client';
import { PrismaService } from '../services/prisma.service';
import { Injectable, UnsupportedMediaTypeException } from '@nestjs/common';
import { IOperation } from 'src/domain/repositories/operation.interface';
import { RefundCancelPurchaseDto } from 'src/application/dtos/requests/refund-cancel-purchase.request.dto';

@Injectable()
export class OperationRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserOperations(userId: string): Promise<IOperation[]> {
    return this.prisma.operation.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findPurchaseByUser(
    refund: RefundCancelPurchaseDto
  ): Promise<IOperation> {
    return this.prisma.operation.findUniqueOrThrow({
      where: {
        id: refund.purchaseId,
        AND: [{ userId: refund.userId }, { type: OperationType.Purchase }],
      },
    });
  }
}
