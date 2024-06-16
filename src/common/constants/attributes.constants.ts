import { OperationTypeEnum } from '../enums/operation-type.enum';

export const ATTRUBUTES = {
  USER_ID: {
    DESCRIPTION: "The wallet's user unique identifier",
    EXAMPLE: '42521829-0cd4-414e-ae3c-c0de489fd4aa',
  },
  ADD_MONEY: {
    VALUE: {
      DESCRIPTION: 'The value that will be added to the wallet',
      EXAMPLE: '300',
    },
  },
  REFUND_CANCEL: {
    PURCHASE_ID: {
      DESCRIPTION: 'The purchase unique identifier',
      EXAMPLE: '018117f4-67f0-44ee-b585-2c2bd593aaf9',
    },
  },
  WITHDRAWAL: {
    VALUE: {
      DESCRIPTION: 'The value that will be removed to the wallet',
      EXAMPLE: '100',
    },
  },
  STATEMENT: {
    ID: {
      DESCRIPTION: 'The statement operation unique identifier',
      EXAMPLE: '67d4003b-6782-4af3-abde-0c0c4bf57f3c',
    },
    TYPE: {
      DESCRIPTION: 'The statement operation type',
      EXAMPLE: OperationTypeEnum.deposit,
    },
    CURRENT_BALANCE: {
      DESCRIPTION: 'The wallet balance after the operation made',
      EXAMPLE: 400,
    },
    CREATED_AT: {
      DESCRIPTION: 'The timestamp when the operation was made',
      EXAMPLE: '2024-06-16T21:00:48Z',
    },
  },
};
