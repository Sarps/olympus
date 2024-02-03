export interface TransactionSendFailedNotifierPort {
  notifyTransactionSendFailed(): Promise<void>;
}
