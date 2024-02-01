import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@domain/services/auth.service';
import { LoginPort } from '@ports/in/auth/LoginPort';
import { RegisterPort } from '@ports/in/auth/RegisterPort';
import { AuthLoginDto } from '@domain/models/dto/auth-login.dto';
import { AuthRegisterDto } from '@domain/models/dto/auth-register.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
@ApiResponse({ status: 400, description: 'Field validations failed' })
export class AuthController implements LoginPort, RegisterPort {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiResponse({ status: 200, description: 'Sign in successful' })
  login(@Body() dto: AuthLoginDto) {
    return this.authService.login(dto.usernameOrEmail, dto.password);
  }

  @Post('register')
  @ApiResponse({ status: 201, description: 'User has been created' })
  register(@Body() dto: AuthRegisterDto) {
    return this.authService.register(dto.username, dto.email, dto.password);
  }
}
