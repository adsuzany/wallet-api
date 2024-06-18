export const RESPONSE = {
  SUCCESS: 'Operation Completed Successfully',
  BALANCE: (value: number) => {
    return `Current Balance: $${value}`;
  },
  NOT_FOUND: 'User not found',
  BAD_REQUEST: 'Value must not be less than 0.1',
  NOT_FOUND_OPERATION: 'Purchase not found',
  BALANCE_NEGATIVE: 'User not found or not enough balance',
};
