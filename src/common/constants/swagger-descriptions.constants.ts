export const SWAGGER = {
  DESCRIPTION: 'This is a Wallet API based on Rest.',
  TITLE: 'Wallet API',
  VERSION: '0.0.1',
  TAG: 'wallet',
  GET_BALANCE: {
    DESCRIPTION: 'Gets the current wallet balance.',
  },
  GET_STATEMENT: {
    DESCRIPTION:
      'Gets the statement with all the operations made for this wallet.',
  },
  DEPOSIT: {
    DESCRIPTION: 'Makes a money deposit into this wallet.',
  },
  WITHDRAWAL: {
    DESCRIPTION: 'Makes a money withdrawal from this wallet.',
  },
  PURCHASE: {
    DESCRIPTION: 'Register a new purchase into this wallet.',
  },
  REFUND_CANCEL: {
    DESCRIPTION: 'Cancel and refund a purchase from this wallet.',
  },
};
