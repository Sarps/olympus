import { UserEvent } from '@domain/models/events/user.event';

export interface UserRegisteredEventPort {
  fire(user: UserEvent): Promise<void>;
}

export const UserRegisteredEventPort = Symbol('UserRegisteredEventPort');
