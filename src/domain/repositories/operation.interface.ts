import { OperationType } from '@prisma/client';

export interface IOperation {
  id?: string;
  type: OperationType;
  userId?: string;
  status?: boolean;
  value: number;
  currentBalance: number;
  createdAt?: Date;
}
