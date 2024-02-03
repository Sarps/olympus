import { LoginPort } from "@ports/in/auth/LoginPort";
import { User } from "@domain/models/User";
import { UserPersistencePort } from "@ports/out/persistence/UserPersistencePort";
import { Inject } from "@nestjs/common";

export class LoginUseCase implements LoginPort {

  constructor(
    @Inject(UserPersistencePort) private userPersistence: UserPersistencePort
  ) {
  }

  async login(usernameOrEmail: string, password: string): Promise<User> {
    try {
      const user = await this.userPersistence.findByUsernameOrEmail(usernameOrEmail);
      // TODO: Validate user password
      return user;
    } catch (e) {
      return null
    }
  }

}
