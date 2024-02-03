import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User } from '@domain/models/User';

@Injectable()
export class UserVerifiedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const { user } = context.switchToHttp().getRequest();
    if (!(user as User).isVerified)
      throw new ForbiddenException('User not verified');
    return true;
  }
}
