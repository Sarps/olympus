import { RegisterPort, RegisterPortOptions } from '@ports/in/auth/register.port';
import { ConflictException, Inject } from "@nestjs/common";
import { UserPersistencePort } from '@ports/out/persistence/user.persistence.port';
import { User } from '@domain/models/User';
import * as bcrypt from 'bcrypt';
import { UserRegisteredEventPort } from "@ports/out/events/user-registered.event.port";

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
