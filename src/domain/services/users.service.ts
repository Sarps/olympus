import { Injectable } from '@nestjs/common';
import { User } from '@domain/models/user';

@Injectable()
export class UsersService {
  create(user: User) {
    return `This action adds a new user ${user}`;
  }

  findById() {
    return `This action returns all users`;
  }
}
