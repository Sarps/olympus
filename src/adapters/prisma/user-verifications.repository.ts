import { PrismaService } from "@adapters/prisma/prisma.service";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { UserVerificationPersistencePort } from "@ports/out/persistence/user-verification.persistence.port";
import { UserVerification } from "@domain/models/UserVerification";

@Injectable()
export class UserVerificationsRepository implements UserVerificationPersistencePort {
  constructor(private prisma: PrismaService) {
  }

  async save(payload: UserVerification): Promise<void> {
    await this.prisma.userVerification.create({
      data: this.fromModel(payload)
    });
  }

  private fromModel({ id, ...payload }: UserVerification): Prisma.UserVerificationUncheckedCreateInput {
    return { ...payload };
  }
}
