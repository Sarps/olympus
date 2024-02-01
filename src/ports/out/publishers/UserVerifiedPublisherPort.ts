import { User } from '@domain/models/User';

export interface UserVerifiedPublisherPort {
  publish(user: User): Promise<void>;
}
