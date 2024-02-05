import { UserEntity } from '@domain/models/entities/user.entity';

export interface VerifyUserPort {
  verifyByToken(token: string): Promise<boolean>;
  verifyByOtp(token: string, user: UserEntity): Promise<boolean>;
}

export const VerifyUserPort = Symbol('VerifyUserPort');
