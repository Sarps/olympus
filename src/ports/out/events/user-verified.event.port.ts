import { UserEvent } from '@domain/models/events/UserEvent';

export interface UserVerifiedEventPort {
  fire(payload: UserEvent): Promise<void>;
}

export const UserVerifiedEventPort = Symbol('UserVerifiedEventPort');
