import { RegisterPort, RegisterPortOptions } from "@ports/in/auth/RegisterPort";
import { Inject } from "@nestjs/common";
import { UserPersistencePort } from "@ports/out/persistence/UserPersistencePort";
import { User } from "@domain/models/User";
import { hash } from "passport-local-authenticate";
import { promisify } from "util";

export class RegisterUseCase implements RegisterPort {
  constructor(
    @Inject(UserPersistencePort) private userPersistence: UserPersistencePort
  ) {
  }

  async register({ name, username, email, password }: RegisterPortOptions) {
    const hashed = await this.hash(password)
    await this.userPersistence.save(
      new User(null, name, username, email, hashed.hash, hashed.salt)
    );
  }

  private async hash(password: string): Promise<{ hash: string, salt: string }> {
    return await promisify(hash)(password);
  }

}
