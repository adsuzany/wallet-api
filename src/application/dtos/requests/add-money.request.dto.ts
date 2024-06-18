import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Min } from 'class-validator';
import { ATTRUBUTES } from 'src/common/constants/attributes.constants';

export class AddMoneyRequestDto {
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
    description: ATTRUBUTES.ADD_MONEY.VALUE.DESCRIPTION,
    example: ATTRUBUTES.ADD_MONEY.VALUE.EXAMPLE,
  })
  value: number;
}
