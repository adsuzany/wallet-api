import { OperationType } from '@prisma/client';

export interface IOperation {
  id?: string;
  type: OperationType;
  userId?: string;
  value: number;
  currentBalance: number;
  createdAt?: Date;
}
