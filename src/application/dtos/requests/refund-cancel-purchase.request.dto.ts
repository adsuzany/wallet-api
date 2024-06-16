import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';
import { ATTRUBUTES } from 'src/common/constants/attributes.constants';

export class RefundCancelPurchaseDto {
  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description: ATTRUBUTES.REFUND_CANCEL.PURCHASE_ID.DESCRIPTION,
    example: ATTRUBUTES.REFUND_CANCEL.PURCHASE_ID.EXAMPLE,
  })
  purchaseId: string;

  @IsNotEmpty()
  @IsUUID()
  @ApiProperty({
    description: ATTRUBUTES.USER_ID.DESCRIPTION,
    example: ATTRUBUTES.USER_ID.EXAMPLE,
  })
  userId: string;
}
