import { ApiProperty } from '@nestjs/swagger';
import { OperationType } from '@prisma/client';
import { ATTRUBUTES } from 'src/common/constants/attributes.constants';

export class StatementResponseDto {
  @ApiProperty({
    description: ATTRUBUTES.STATEMENT.ID.DESCRIPTION,
    example: ATTRUBUTES.STATEMENT.ID.EXAMPLE,
  })
  id: string;

  @ApiProperty({
    description: ATTRUBUTES.STATEMENT.TYPE.DESCRIPTION,
    example: ATTRUBUTES.STATEMENT.TYPE.EXAMPLE,
  })
  type: OperationType;

  @ApiProperty({
    description: ATTRUBUTES.USER_ID.DESCRIPTION,
    example: ATTRUBUTES.USER_ID.EXAMPLE,
  })
  userId: string;

  @ApiProperty({
    description: ATTRUBUTES.ADD_MONEY.VALUE.DESCRIPTION,
    example: ATTRUBUTES.ADD_MONEY.VALUE.EXAMPLE,
  })
  value: number;

  @ApiProperty({
    description: ATTRUBUTES.STATEMENT.CURRENT_BALANCE.DESCRIPTION,
    example: ATTRUBUTES.STATEMENT.CURRENT_BALANCE.EXAMPLE,
  })
  currentBalance: number;

  @ApiProperty({
    description: ATTRUBUTES.STATEMENT.CREATED_AT.DESCRIPTION,
    example: ATTRUBUTES.STATEMENT.CREATED_AT.EXAMPLE,
  })
  createdAt: Date;
}
