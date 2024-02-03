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
import { Wallet } from '@domain/models/Wallet';
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { RequestUser } from '@adapters/passport/user.decorator';
import { User } from '@domain/models/User';
import { JwtGuard } from '@adapters/passport/guards';
import { UserProfileResponseDto } from '@adapters/web/dto/user-profile.dto';
import { UserVerifiedGuard } from '@adapters/web/user-verified.guard';

@ApiTags('Users')
@Controller('users')
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden' })
@UseGuards(JwtGuard)
@ApiBearerAuth()
export class UsersController implements VerifyUserPort, UserWalletBalancePort {
  constructor(
    @Inject(UserProfilePort) private readonly userProfile: UserProfilePort,
  ) {}

  @Get('profile')
  async getUserProfile(
    @RequestUser() user: User,
  ): Promise<UserProfileResponseDto> {
    const { name, username, email } =
      await this.userProfile.getUserProfile(user);
    return { name, email, username };
  }

  @Get('verify/:key')
  async verify(@Param('key', ParseUUIDPipe) key: string) {
    // return this.usersService.verify(key);
  }

  @Get('balance')
  @UseGuards(UserVerifiedGuard)
  async viewUserWalletBalance(): Promise<Wallet> {
    throw Error('Not Implemented');
  }
}
