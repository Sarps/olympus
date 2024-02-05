require('dotenv').config();

export const JWT_SECRET: string = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN;

export const VERIFY_URL: string = process.env.VERIFY_URL;
export const OTP_EXPIRY_MINUTES = +process.env.OTP_EXPIRY_MINUTES;
export const TOKEN_EXPIRY_MINUTES = +process.env.TOKEN_EXPIRY_MINUTES;

export const EVENTS = {
  USER_REGISTERED: process.env.EVENTS_USER_REGISTERED,
  USER_VERIFIED: process.env.EVENTS_USER_VERIFIED,
  TRANSACTION_SENT: process.env.EVENTS_TRANSACTION_SENT,
  TRANSACTION_FAILED: process.env.EVENTS_TRANSACTION_FAILED,
};

export const MAIL_HOST = process.env.MAIL_HOST;
export const MAIL_PORT = +process.env.MAIL_PORT;

export const INITIAL_WALLET_BALANCE = +process.env.INITIAL_WALLET_BALANCE;
