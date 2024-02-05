import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { VerifyUserPort } from '@ports/in/users/verify-user.port';
import { UserProfilePort } from '@ports/in/users/user-profile.port';
import { UserWalletBalancePort } from '@ports/in/wallets/user-wallet-balance.port';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RequestUser } from '@infrastructure/passport/user.decorator';
import { UserEntity } from '@domain/models/entities/user.entity';
import { UserProfileResponseDto } from '@infrastructure/web/dto/user-profile.dto';
import { UserVerifiedGuard } from '@infrastructure/web/user-verified.guard';
import { AmountEntity } from '@domain/models/entities/amount.entity';
import { JwtGuard } from '@infrastructure/passport/guards/jwt.guard';
import { UserVerifyDto } from '@infrastructure/web/dto/user-verify.dto';

@ApiTags('Users')
@Controller('users')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiBearerAuth()
export class UsersController {
  constructor(
    @Inject(UserProfilePort) private readonly userProfile: UserProfilePort,
    @Inject(VerifyUserPort) private readonly verifyUser: VerifyUserPort,
    @Inject(UserWalletBalancePort)
    private readonly userWalletBalance: UserWalletBalancePort,
  ) {}

  @Get('profile')
  @UseGuards(JwtGuard)
  async getUserProfile(
    @RequestUser() user: UserEntity,
  ): Promise<UserProfileResponseDto> {
    const { id, name, username, email } =
      await this.userProfile.getUserProfile(user);
    return { id, name, email, username };
  }

  @Get('verify/:link_token')
  @ApiResponse({
    status: 201,
    description: 'User has been verified successfully',
  })
  async verifyViaToken(@Param('link_token') token: string) {
    await this.verifyUser.verifyByToken(token);
    return 'Successfully verified. Please resume testing';
  }

  @Post('verify')
  @ApiResponse({
    status: 201,
    description: 'User has been verified successfully',
  })
  @UseGuards(JwtGuard)
  async verifyViaOtp(
    @Body() { pin }: UserVerifyDto,
    @RequestUser() user: UserEntity,
  ) {
    await this.verifyUser.verifyByOtp(pin, user);
  }

  @Get('balance')
  @UseGuards(JwtGuard, UserVerifiedGuard)
  async viewUserWalletBalance(
    @RequestUser() user: UserEntity,
  ): Promise<AmountEntity> {
    return this.userWalletBalance.viewUserWalletBalance(user.id);
  }
}
