export const RESPONSE = {
  SUCCESS: 'Completed Successfully',
  BALANCE: (value: number) => {
    return `Current Balance: $${value}`;
  },
  NOT_FOUND: 'User not found',
};
