import { RegisterPort, RegisterPortOptions } from '@ports/in/auth/RegisterPort';
import { ConflictException, Inject } from "@nestjs/common";
import { UserPersistencePort } from '@ports/out/persistence/UserPersistencePort';
import { User } from '@domain/models/User';
import * as bcrypt from 'bcrypt';
import { UserVerifiedEventPort } from "@ports/out/events/UserVerifiedEventPort";
import { UserRegisteredEventPort } from "@ports/out/events/UserRegisteredEventPort";

export class RegisterUseCase implements RegisterPort {
  constructor(
    @Inject(UserPersistencePort)
    private userPersistence: UserPersistencePort,
    @Inject(UserRegisteredEventPort)
    private userRegisteredEvent: UserRegisteredEventPort,
  ) {}

  async register({ name, username, email, password }: RegisterPortOptions) {
    try {
      const { passwordHash: _, ...user } = await this.userPersistence.save(
        new User(null, name, username, email, await this.hash(password)),
      );
      await this.userRegisteredEvent.fire(user)
    } catch (e) {
      throw new ConflictException("The username or email is already in use")
    }
  }

  private async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }
}
