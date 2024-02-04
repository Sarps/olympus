import { PrismaService } from '@adapters/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserPersistencePort } from '@ports/out/persistence/user.persistence.port';
import { UserEntity } from '@domain/models/entities/user.entity';
import { Prisma } from '@prisma/client';

@Injectable()
export class UsersRepository implements UserPersistencePort {
  constructor(private prisma: PrismaService) {}

  async save(user: UserEntity): Promise<string> {
    const result = await this.prisma.user.create({
      data: this.fromModel(user),
      select: { id: true },
    });
    return result.id;
  }

  async update(user: UserEntity): Promise<void> {
    await this.prisma.user.update({
      where: { id: user.id },
      data: this.fromModel(user),
    });
  }

  async findById(id: string): Promise<UserEntity> {
    const result = await this.prisma.user.findFirstOrThrow({
      where: { id },
    });
    return this.toModel(result);
  }

  async findByUsernameOrEmail(usernameOrEmail: string): Promise<UserEntity> {
    const result = await this.prisma.user.findFirstOrThrow({
      where: {
        OR: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
      },
    });
    return this.toModel(result);
  }

  private toModel({
    id,
    name,
    username,
    email,
    passwordHash,
    lastVerified,
  }: Prisma.UserGetPayload<any>): UserEntity {
    return new UserEntity(
      id,
      name,
      username,
      email,
      passwordHash,
      lastVerified,
    );
  }

  private fromModel({
    id: _,
    ...user
  }: UserEntity): Prisma.UserUncheckedCreateInput {
    return { ...user };
  }
}
