import { AuthRegisterDto } from '@adapters/rest/dto/auth-register.dto';

export interface RegisterPort {
  register(dto: AuthRegisterDto);
}
