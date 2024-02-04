export type InitiateTransaction = {
  idempotencyKey: string;
  amount: number;
  senderId: string;
  narration: string;
  recipientId: string;
  recipientNarration: string;
};

export interface InitiateTransactionPort {
  initiateTransaction(payload: InitiateTransaction): Promise<void>;
}

export const InitiateTransactionPort = Symbol('InitiateTransactionPort');
