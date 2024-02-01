import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from '@domain/services/users.service';
import { VerifyUserPort } from '@ports/in/users/VerifyUserPort';
import { UserProfilePort } from '@ports/in/users/UserProfilePort';
import { UserWalletBalance } from '@ports/in/wallets/UserWalletBalance';
import { Wallet } from '@domain/models/Wallet';

@Controller('users')
export class UsersController
  implements VerifyUserPort, UserProfilePort, UserWalletBalance
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
