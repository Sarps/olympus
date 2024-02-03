import { AuthRegisterDto } from '@domain/models/dto/auth-register.dto';

export interface RegisterPort {
  register(dto: AuthRegisterDto);
}
