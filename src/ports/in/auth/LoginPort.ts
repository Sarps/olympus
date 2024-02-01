import { AuthLoginDto } from '@adapters/rest/dto/auth-login.dto';

export interface LoginPort {
  login(dto: AuthLoginDto);
}
