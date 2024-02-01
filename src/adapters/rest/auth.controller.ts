import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@domain/services/auth.service';
import { AuthLoginDto } from '@adapters/rest/dto/auth-login.dto';
import { AuthRegisterDto } from '@adapters/rest/dto/auth-register.dto';
import { LoginPort } from '@ports/in/auth/LoginPort';
import { RegisterPort } from '@ports/in/auth/RegisterPort';

@Controller('auth')
export class AuthController implements LoginPort, RegisterPort {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: AuthLoginDto) {
    return this.authService.login(dto.usernameOrEmail, dto.password);
  }

  @Post('register')
  register(@Body() dto: AuthRegisterDto) {
    return this.authService.register(dto.username, dto.email, dto.password);
  }
}
