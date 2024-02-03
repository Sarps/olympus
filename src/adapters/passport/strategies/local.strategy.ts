import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { LoginPort } from "@ports/in/auth/LoginPort";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(LoginPort) private loginPort: LoginPort) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.loginPort.login(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
