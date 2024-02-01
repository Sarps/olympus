import { Injectable } from '@nestjs/common';
import { User } from '@domain/models/user';

@Injectable()
export class AuthService {
  login(usernameOrEmail: string, password: string) {
    return `${usernameOrEmail}, ${password}`;
  }

  register(username: string, email: string, password: string) {
    return `${username}, ${email}, ${password}`;
  }
}
