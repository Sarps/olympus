import { LoginPort } from '@ports/in/auth/login.port';
import { User } from '@domain/models/User';
import { UserPersistencePort } from '@ports/out/persistence/user.persistence.port';
import { Inject } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export class LoginUseCase implements LoginPort {
  constructor(
    @Inject(UserPersistencePort) private userPersistence: UserPersistencePort,
  ) {}

  async login(usernameOrEmail: string, password: string): Promise<User> {
    try {
      const user =
        await this.userPersistence.findByUsernameOrEmail(usernameOrEmail);
      if (await this.isValidPassword(password, user)) return user;
    } catch (e) {
      console.log('Failed retrieving user', e);
    }
    return null;
  }

  private async isValidPassword(
    password: string,
    user: User,
  ): Promise<boolean> {
    return bcrypt.compare(password, user.passwordHash);
  }
}
