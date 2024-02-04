import { UserEvent } from '@domain/models/events/UserEvent';

export interface UserRegisteredEventPort {
  fire(user: UserEvent): Promise<void>;
}

export const UserRegisteredEventPort = Symbol('UserRegisteredEventPort');
