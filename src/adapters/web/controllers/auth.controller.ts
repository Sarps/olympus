import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { RegisterPort } from "@ports/in/auth/RegisterPort";
import { AuthLoginDto } from "@adapters/web/dto/auth-login.dto";
import { AuthRegisterDto } from "@domain/models/dto/auth-register.dto";
import { ApiBadRequestResponse, ApiBody, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { RequestUser } from "@adapters/passport/user.decorator";
import { User } from "@domain/models/User";

@ApiTags("Authentication")
@Controller("auth")
@ApiBadRequestResponse({ description: "Field validations failed" })
export class AuthController implements RegisterPort {

  @Post("login")
  @ApiBody({ type: AuthLoginDto })
  @ApiResponse({ status: 200, description: "Sign in successful" })
  @UseGuards(AuthGuard("local"))
  async login(@RequestUser() user: User) {
    return { user };
  }

  @Post("register")
  @ApiResponse({ status: 201, description: "User has been created" })
  register(@Body() dto: AuthRegisterDto) {
    // return this.authService.register(dto.username, dto.email, dto.password);
  }
}
