export interface IPaymentNotifier {
  notifyPaymentSuccess(): Promise<void>;
  notifyPaymentFailed(): Promise<void>;
}

export const IPaymentNotifier = Symbol('IPaymentNotifier');
