import { UserEntity } from "@domain/models/entities/user.entity";

export type UserEvent = Omit<UserEntity, "passwordHash" | "isVerified">
