import { OperationTypeEnum } from 'src/common/enums/operation-type.enum';

export interface IOperation {
  type: OperationTypeEnum;
  value: number;
  currentBalance: number;
}
