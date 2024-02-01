import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from '@domain/services/auth.service';
import { AuthLoginDto } from '@infrastructure/rest/dto/auth-login.dto';
import { AuthRegisterDto } from '@infrastructure/rest/dto/auth-register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Body() dto: AuthLoginDto) {
    return this.authService.login(dto.usernameOrEmail, dto.password);
  }

  @Post('register')
  register(@Body() dto: AuthRegisterDto) {
    return this.authService.register(dto.username, dto.email, dto.password);
  }

  @Get('verify/:id') // TODO: Id pattern validation
  findOne(@Param('id') id: string) {
    return this.authService.verify(id);
  }
}
