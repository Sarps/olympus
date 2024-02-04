import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class AuthLoginDto {
  @ApiProperty({
    description: 'Username or email of user',
    example: 'example@email.com',
  })
  @IsNotEmpty()
  username: string;
  @ApiProperty({ description: 'User password', example: 'ZL4IW90N7Wsn3IC!' })
  @IsNotEmpty()
  password: string;
}
