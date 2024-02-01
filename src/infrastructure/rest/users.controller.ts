import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from '@domain/services/users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('me')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/me')
  userProfile() {
    return this.usersService.findById();
  }
}
