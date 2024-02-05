export const JWT_SECRET: string = 'Some JWT Secret';
export const JWT_EXPIRES_IN: string = '86400s';

export const VERIFY_URL: string = 'http://localhost:3000/users/verify';
export const OTP_EXPIRY_MINUTES = 5;
export const TOKEN_EXPIRY_MINUTES = 24 * 60;

export const EVENTS = {
  USER_REGISTERED: 'user.registered',
  USER_VERIFIED: 'user.verified',
  TRANSACTION_SENT: 'transaction.sent',
  TRANSACTION_FAILED: 'transaction.failed',
};

export const MAIL_HOST = 'localhost'
export const MAIL_PORT = 1025

export const INITIAL_WALLET_BALANCE = 1000
