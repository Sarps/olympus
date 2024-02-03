import { RegisterPort, RegisterPortOptions } from "@ports/in/auth/RegisterPort";
import { Inject } from "@nestjs/common";
import { UserPersistencePort } from "@ports/out/persistence/UserPersistencePort";
import { User } from "@domain/models/User";
import * as bcrypt from 'bcrypt';

export class RegisterUseCase implements RegisterPort {
  constructor(
    @Inject(UserPersistencePort) private userPersistence: UserPersistencePort
  ) {
  }

  async register({ name, username, email, password }: RegisterPortOptions) {
    const hashed =
    await this.userPersistence.save(
      new User(null, name, username, email, await this.hash(password))
    );
  }

  private async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

}
