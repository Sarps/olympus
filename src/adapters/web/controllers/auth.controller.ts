import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { RegisterPort } from '@ports/in/auth/register.port';
import { AuthLoginDto } from '@adapters/web/dto/auth-login.dto';
import { AuthRegisterDto } from '@adapters/web/dto/auth-register.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RequestUser } from '@adapters/passport/user.decorator';
import { User } from '@domain/models/User';
import { JwtService } from '@nestjs/jwt';
import { LoginGuard } from '@adapters/passport/guards';
import { JWT_EXPIRES_IN } from '@adapters/constants';

@ApiTags('Authentication')
@Controller('auth')
@ApiBadRequestResponse({ description: 'Field validations failed' })
export class AuthController {
  constructor(
    @Inject(RegisterPort)
    private registerPort: RegisterPort,
    private jwtService: JwtService,
  ) {}

  @Post('login')
  @ApiBody({ type: AuthLoginDto })
  @ApiResponse({ status: 200, description: 'Sign in successful' })
  @UseGuards(LoginGuard)
  async login(@RequestUser() user: User) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
      expiresIn: JWT_EXPIRES_IN,
    };
  }

  @Post('register')
  @ApiResponse({ status: 201, description: 'User has been created' })
  register(@Body() dto: AuthRegisterDto) {
    return this.registerPort.register({
      name: dto.name,
      username: dto.username,
      email: dto.email,
      password: dto.password,
    });
  }
}
