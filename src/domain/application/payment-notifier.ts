import { NotificationsPort } from '@ports/out/notifications.interface';
import { IPaymentNotifier } from '@domain/application/payment-notifier.interface';

export class PaymentNotifierUseCase implements IPaymentNotifier {
  constructor(private notificationsPort: NotificationsPort) {}
  notifyPaymentSuccess(): Promise<void> {
    throw new Error('Method not implemented.');
  }

  notifyPaymentFailed(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
