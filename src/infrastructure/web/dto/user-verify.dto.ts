import { IsAlphanumeric, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserVerifyDto {
  @ApiProperty({
    description: 'OTP as received in notification',
    example: 'Z125T9',
  })
  @IsAlphanumeric()
  @IsNotEmpty()
  pin: string
}
