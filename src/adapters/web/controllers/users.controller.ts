import { Controller, Get, Inject, Param, UseGuards } from "@nestjs/common";
import { VerifyUserPort } from "@ports/in/users/VerifyUserPort";
import { UserProfilePort } from "@ports/in/users/UserProfilePort";
import { UserWalletBalancePort } from "@ports/in/wallets/UserWalletBalancePort";
import { Wallet } from "@domain/models/Wallet";
import { ApiForbiddenResponse, ApiTags, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";
import { RequestUser } from "@adapters/passport/user.decorator";
import { User } from "@domain/models/User";
import { JwtGuard } from "@adapters/passport/guards";

@ApiTags("Users")
@Controller("users")
@ApiUnauthorizedResponse({ description: "Unauthorized" })
@ApiForbiddenResponse({ description: "Forbidden" })
@UseGuards(JwtGuard)
export class UsersController
  implements VerifyUserPort, UserWalletBalancePort {
  constructor(
    @Inject(UserProfilePort) private readonly userProfile: UserProfilePort
  ) {
  }

  @Get("profile")
  async getUserProfile(@RequestUser() user: User) {
    return this.userProfile.getUserProfile(user);
  }

  @Get("verify/:key") // TODO: Id pattern validation
  async verify(@Param("key") key: string) {
    // return this.usersService.verify(key);
  }

  @Get("balance")
  @UseGuards(AuthGuard("jwt"))
  async viewUserWalletBalance(): Promise<Wallet> {
    throw Error("Not Implemented");
  }
}
