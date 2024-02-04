import { ApiProperty } from '@nestjs/swagger';
import {
  IsAlphanumeric,
  IsDefined,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsStrongPassword,
  ValidateIf,
} from 'class-validator';

export class AuthRegisterDto {
  @ApiProperty({ description: 'Full name of user', example: 'John Doe' })
  @IsNotEmpty()
  name: string;
  @ApiProperty({ description: 'Username', example: 'sarps123' })
  @IsAlphanumeric()
  username: string;
  @ApiProperty({
    description: 'Valid email of user',
    example: 'example@email.com',
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    description:
      'Password length must minimum of 10. At least a lowercase, uppercase, number and symbol ',
    example: 'ZL4IW90N7Wsn3IC!',
  })
  @IsStrongPassword({
    minLength: 10,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
  @ApiProperty({
    description: 'Password confirmation',
    example: 'ZL4IW90N7Wsn3IC!',
  })
  @IsDefined()
  @ValidateIf((o) => o.password !== o.passwordConfirmation)
  @IsEmpty({ message: 'Password confirmation must match password' })
  passwordConfirmation: string;
}
