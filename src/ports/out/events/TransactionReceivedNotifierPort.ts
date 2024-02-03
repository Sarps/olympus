export interface TransactionReceivedNotifierPort {
  notifyTransactionReceived(): Promise<void>;
}
