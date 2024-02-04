import { ApiProperty } from '@nestjs/swagger';

export class AuthLoginDto {
  @ApiProperty({
    description: 'Username or email of user',
    example: 'example@email.com',
  })
  username: string;
  @ApiProperty({ description: 'User password', example: 'ZL4IW90N7Wsn3IC!' })
  password: string;
}
