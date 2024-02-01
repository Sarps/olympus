import { Injectable } from '@nestjs/common';
import { User } from '@domain/models/user';

@Injectable()
export class UsersService {
  findById(): Promise<User> {
    throw Error('Not implemented');
  }

  verify(key: string) {
    return `This action removes a #${key} auth`;
  }
}
