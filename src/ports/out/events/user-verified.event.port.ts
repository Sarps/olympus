import { UserEvent } from '@domain/models/events/user.event';

export interface UserVerifiedEventPort {
  fire(payload: UserEvent): Promise<void>;
}

export const UserVerifiedEventPort = Symbol('UserVerifiedEventPort');
