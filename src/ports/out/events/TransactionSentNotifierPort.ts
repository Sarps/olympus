export interface TransactionSentNotifierPort {
  notifyTransactionSent(): Promise<void>;
}
