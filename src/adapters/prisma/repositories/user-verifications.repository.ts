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

  async findUserIdByOtpOrToken(otpOrToken: string): Promise<string> {
    const result = await this.prisma.userVerification.findFirstOrThrow({
      where: {
        OR: [
          { linkToken: otpOrToken, linkExpiresAt: { gt: new Date() } },
          { otpCode: otpOrToken, otpExpiresAt: { gt: new Date() } }
        ]
      },
      select: {
        userId: true
      }
    });
    return result.userId
  }

  private fromModel({ id, ...payload }: UserVerification): Prisma.UserVerificationUncheckedCreateInput {
    return { ...payload };
  }
}
