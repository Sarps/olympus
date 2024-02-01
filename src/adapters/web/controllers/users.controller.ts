import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from '@domain/services/users.service';
import { VerifyUserPort } from '@ports/in/users/VerifyUserPort';
import { UserProfilePort } from '@ports/in/users/UserProfilePort';
import { UserWalletBalancePort } from '@ports/in/wallets/UserWalletBalancePort';
import { Wallet } from '@domain/models/Wallet';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
@ApiResponse({ status: 401, description: 'Unauthorized' })
export class UsersController
  implements VerifyUserPort, UserProfilePort, UserWalletBalancePort
{
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  async getUserProfile() {
    return this.usersService.findById();
  }

  @Get('verify/:key') // TODO: Id pattern validation
  async verify(@Param('key') key: string) {
    return this.usersService.verify(key);
  }

  @Get('balance')
  async viewUserWalletBalance(): Promise<Wallet> {
    throw Error('Not Implemented');
  }
}
