import { ApiProperty } from "@nestjs/swagger";

export class AuthRegisterDto {
  @ApiProperty({description: 'Full name of user', example: "John Doe"})
  name: string
  @ApiProperty({description: 'Username', example: "sarps123"})
  username: string;
  @ApiProperty({description: 'Valid email of user', example: "example@email.com"})
  email: string;
  @ApiProperty({description: 'User password', example: "ZL4IW90N7Wsn3IC"})
  password: string;
}
