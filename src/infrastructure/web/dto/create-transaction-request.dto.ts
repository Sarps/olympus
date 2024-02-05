import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateTransactionRequestDto {
  @ApiProperty({
    description: 'Amount (maximum of 2 decimals)',
    example: '10.20',
  })
  @IsPositive()
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;
  @ApiProperty({
    description: 'Narration (as seen by sender)',
    example: 'Test transaction',
  })
  @IsNotEmpty()
  narration: string;
  @ApiProperty({
    description: 'Recipient ID',
    example: 'ccda952a-ad77-4a57-9c97-d4e28989a0e1',
  })
  @IsUUID()
  recipientId: string;
  @ApiProperty({
    description: 'Narration (as seen by recipient). Defaults to "narration"',
    example: 'Test transaction',
  })
  @IsOptional()
  recipientNarration?: string;
}
