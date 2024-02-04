import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserEntity } from '@domain/models/entities/user.entity';

@Injectable()
export class UserVerifiedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    if (!(user as UserEntity).isVerified)
      throw new ForbiddenException('User not verified');
    return true;
  }
}
