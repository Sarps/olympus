import { UserEntity } from '@domain/models/entities/user.entity';

export interface UserVerifiedPublisherPort {
  publish(user: UserEntity): Promise<void>;
}
