import { PartialType } from '@nestjs/mapped-types';
import { AuthLoginDto } from './auth-login.dto';

export class UpdateAuthDto extends PartialType(AuthLoginDto) {}
