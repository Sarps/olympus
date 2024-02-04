import {
  IsDecimal,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTransactionDto {
  @ApiProperty({
    description: 'Unique UUID for transaction',
    example: 'a1d61baf-3299-4143-a523-069b8dc65671',
  })
  @IsUUID()
  idempotencyKey: string;
  @ApiProperty({
    description: 'Amount (maximum of 2 decimals)',
    example: '10.20',
  })
  @IsPositive()
  @IsDecimal({ decimal_digits: '0,2' })
  amount: number;
  @ApiProperty({
    description: 'Sender ID',
    example: '3b526551-6062-43e7-aaf2-2363e45e55db',
  })
  @IsUUID()
  senderId: string;
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
  recipientNarration: string;
}
