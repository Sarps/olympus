import { User } from '@domain/models/User';

export interface UserRegisteredPublisherPort {
  publish(user: User): Promise<void>;
}
