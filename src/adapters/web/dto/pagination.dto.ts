import { ApiProperty, ApiQuery } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsPositive } from "class-validator";
import { Type } from "class-transformer";

export class PaginationDto {
  @ApiProperty({default: 1, required: false})
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  page: number
  @ApiProperty({default: 10, required: false})
  @IsOptional()
  @IsPositive()
  @Type(() => Number)
  perPage: number
}
