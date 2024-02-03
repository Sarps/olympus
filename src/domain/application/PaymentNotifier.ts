import { TransactionSendFailedNotifierPort } from '@ports/out/events/TransactionSendFailedNotifierPort';
import { TransactionSentNotifierPort } from '@ports/out/events/TransactionSentNotifierPort';
import { TransactionReceivedNotifierPort } from '@ports/out/events/TransactionReceivedNotifierPort';

export interface PaymentNotifier {
  notifyPaymentSuccess(): Promise<void>;

  notifyPaymentFailed(): Promise<void>;
}

export class PaymentNotifierUseCase implements PaymentNotifier {
  constructor(
    private sentNotifier: TransactionSentNotifierPort,
    private sendFailedNotifier: TransactionSendFailedNotifierPort,
    private receivedNotifier: TransactionReceivedNotifierPort,
  ) {}

  notifyPaymentSuccess(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  notifyPaymentFailed(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export const PaymentNotifier = Symbol('PaymentNotifier');
