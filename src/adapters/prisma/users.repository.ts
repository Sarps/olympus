import { PrismaService } from "@adapters/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { UserPersistencePort } from "@ports/out/persistence/UserPersistencePort";
import { User } from "@domain/models/User";

@Injectable()
export class UsersRepository implements UserPersistencePort {
  constructor(private prisma: PrismaService) {
  }

  async save(user: User): Promise<void> {
    await this.prisma.user.create({
      data: this.fromModel(user)
    });
  }

  async update(user: User): Promise<void> {
    await this.prisma.user.update({
      where: { id: user.id },
      data: this.fromModel(user)
    });
  }

  async findById(id: string): Promise<User> {
    const result = await this.prisma.user.findFirstOrThrow({
      where: { id }
    });
    return this.toModel(result);
  }

  async findByUsernameOrEmail(usernameOrEmail: string): Promise<User> {
    const result = await this.prisma.user.findFirstOrThrow({
      where: {
        OR: [
          { username: usernameOrEmail }, { email: usernameOrEmail }
        ]
      }
    });
    return this.toModel(result);
  }

  private toModel({ id, name, username, email, passwordHash }: any): User {
    return new User(id, name, username, email, passwordHash);
  }

  private fromModel({ id, ...user }: User): any {
    return { ...user };
  }
}
