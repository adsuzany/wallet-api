import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUUID, Min } from 'class-validator';
import { ATTRUBUTES } from 'src/common/constants/attributes.constants';

export class WithdrawalMoneyRequestDto {
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({
    description: ATTRUBUTES.USER_ID.DESCRIPTION,
    example: ATTRUBUTES.USER_ID.EXAMPLE,
  })
  userId: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0.1)
  @ApiProperty({
    description: ATTRUBUTES.WITHDRAWAL.VALUE.DESCRIPTION,
    example: ATTRUBUTES.WITHDRAWAL.VALUE.EXAMPLE,
  })
  value: number;
}
