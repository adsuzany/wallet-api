export const RESPONSE = {
  SUCCESS: 'Operation Completed Successfully',
  BALANCE: (value: number) => {
    return `Current Balance: $${value}`;
  },
  NOT_FOUND: 'User not found',
  NOT_FOUND_OPERATION: 'Purchase not found',
};
