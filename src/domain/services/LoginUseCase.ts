import { LoginPort } from "@ports/in/auth/LoginPort";
import { User } from "@domain/models/User";
import { UserPersistencePort } from "@ports/out/persistence/UserPersistencePort";
import { Inject } from "@nestjs/common";
import { verify } from "passport-local-authenticate";
import { promisify } from "util";

export class LoginUseCase implements LoginPort {

  constructor(
    @Inject(UserPersistencePort) private userPersistence: UserPersistencePort
  ) {
  }

  async login(usernameOrEmail: string, password: string): Promise<User> {
    try {
      const user = await this.userPersistence.findByUsernameOrEmail(usernameOrEmail);
      if (await this.isValidPassword(password, user)) return user;
    } catch (e) {
      console.log("Failed retrieving user", e);
    }
    return null;
  }

  private async isValidPassword(password: string, user: User): Promise<boolean> {
    return promisify(verify)(password, { salt: user.passwordSalt, hash: user.passwordHash });
  }

}
