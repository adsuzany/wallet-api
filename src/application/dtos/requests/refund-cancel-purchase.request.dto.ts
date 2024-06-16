import { IsNotEmpty, IsUUID } from 'class-validator';

export class RefundCancelPurchaseDto {
  @IsNotEmpty()
  @IsUUID()
  purchaseId: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
