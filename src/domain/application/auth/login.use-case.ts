import { LoginPort } from '@ports/in/auth/login.port';
import { UserEntity } from '@domain/models/entities/user.entity';
import { UserPersistencePort } from '@ports/out/persistence/user.persistence.port';
import { Inject } from '@nestjs/common';
const bcrypt = require('bcrypt');

export class LoginUseCase implements LoginPort {
  constructor(
    @Inject(UserPersistencePort) private userPersistence: UserPersistencePort,
  ) {}

  async login(usernameOrEmail: string, password: string): Promise<UserEntity> {
    try {
      const user =
        await this.userPersistence.findByUsernameOrEmail(usernameOrEmail);
      if (await this.isValidPassword(password, user)) return user;
    } catch (e) {}
    return null;
  }

  private async isValidPassword(
    password: string,
    user: UserEntity,
  ): Promise<boolean> {
    return bcrypt.compare(password, user.passwordHash);
  }
}
