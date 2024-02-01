import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(usernameOrEmail: string, password: string) {
    return `${usernameOrEmail}, ${password}`;
  }

  register(username: string, email: string, password: string) {
    return `${username}, ${email}, ${password}`;
  }
}
