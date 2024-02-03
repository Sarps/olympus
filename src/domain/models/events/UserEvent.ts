import { User } from "@domain/models/User";

export type UserEvent = Omit<User, "passwordHash" | "isVerified">
