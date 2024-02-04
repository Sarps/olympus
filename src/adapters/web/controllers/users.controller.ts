import {
  Controller,
  Get,
  Inject,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { VerifyUserPort } from '@ports/in/users/verify-user.port';
import { UserProfilePort } from '@ports/in/users/user-profile.port';
import { UserWalletBalancePort } from '@ports/in/wallets/user-wallet-balance.port';
import { WalletEntity } from '@domain/models/entities/wallet.entity';
import {
  ApiBearerAuth,
  ApiForbiddenResponse, ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { RequestUser } from '@adapters/passport/user.decorator';
import { UserEntity } from '@domain/models/entities/user.entity';
import { JwtGuard } from '@adapters/passport/guards';
import { UserProfileResponseDto } from '@adapters/web/dto/user-profile.dto';
import { UserVerifiedGuard } from '@adapters/web/user-verified.guard';
import { AmountEntity } from "@domain/models/entities/amount.entity";

@ApiTags('Users')
@Controller('users')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden' })
@ApiBearerAuth()
export class UsersController {
  constructor(
    @Inject(UserProfilePort) private readonly userProfile: UserProfilePort,
    @Inject(VerifyUserPort) private readonly verifyUser: VerifyUserPort,
    @Inject(UserWalletBalancePort) private readonly userWalletBalance: UserWalletBalancePort,
  ) {}

  @Get('profile')
  @UseGuards(JwtGuard)
  async getUserProfile(
    @RequestUser() user: UserEntity,
  ): Promise<UserProfileResponseDto> {
    const { name, username, email } =
      await this.userProfile.getUserProfile(user);
    return { name, email, username };
  }

  @Get('verify/:code')
  @ApiResponse({ status: 201, description: 'User has been verified successfully' })
  async verify(@Param('code') tokenOrCode: string) {
    await this.verifyUser.verifyByTokenOrOtp(tokenOrCode)
  }

  @Get('balance')
  @UseGuards(JwtGuard, UserVerifiedGuard)
  async viewUserWalletBalance(@RequestUser() user: UserEntity): Promise<AmountEntity> {
    return this.userWalletBalance.viewUserWalletBalance(user.id)
  }
}
