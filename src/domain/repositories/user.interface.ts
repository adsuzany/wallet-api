import { IOperation } from './operation.interface';

export interface IUser {
  id: string;
  balance: number;
  createdAt?: Date;
  operations?: IOperation[];
}
